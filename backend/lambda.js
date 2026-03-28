/**
 * AWS Lambda entry point.
 *
 * On cold start (first invocation after deployment):
 *   1. Loads secrets from SSM Parameter Store (/hotel/{DEPLOY_ENV}/*)
 *   2. Creates the Express app with those secrets in process.env
 *   3. Wraps the app with serverless-http and caches the handler
 *
 * Subsequent warm invocations reuse the cached handler (no SSM call).
 * In local development (NODE_ENV=development), SSM is skipped entirely.
 */

import { SSMClient, GetParametersCommand } from '@aws-sdk/client-ssm';
import serverlessHttp from 'serverless-http';
import { createApp } from './src/app.js';

let cachedHandler = null;

async function loadSecretsFromSSM() {
  if (process.env.NODE_ENV === 'development') {
    // Local dev — secrets come from backend/.env via dotenv
    return;
  }

  const env = process.env.DEPLOY_ENV || 'stage';
  const region = process.env.AWS_REGION || 'ap-south-1';

  console.log(`[lambda] Loading secrets from SSM: /hotel/${env}/* (region: ${region})`);

  const ssm = new SSMClient({ region });

  const { Parameters, InvalidParameters } = await ssm.send(
    new GetParametersCommand({
      Names: [
        `/hotel/${env}/JWT_SECRET`,
        `/hotel/${env}/ADMIN_USERNAME`,
        `/hotel/${env}/ADMIN_PASSWORD_HASH`,
        `/hotel/${env}/CORS_ORIGIN`,
      ],
      WithDecryption: true,
    })
  );

  if (InvalidParameters && InvalidParameters.length > 0) {
    console.error('[lambda] Missing SSM parameters:', InvalidParameters);
    throw new Error(`Missing SSM parameters: ${InvalidParameters.join(', ')}`);
  }

  // Inject into process.env so createApp() and middleware pick them up
  for (const { Name, Value } of Parameters) {
    const key = Name.split('/').pop();
    process.env[key] = Value;
  }

  console.log(`[lambda] Loaded ${Parameters.length} secrets from SSM`);
}

export const handler = async (event, context) => {
  // Reuse handler across warm invocations (Lambda execution environment is kept alive)
  if (!cachedHandler) {
    await loadSecretsFromSSM();
    const app = createApp();
    cachedHandler = serverlessHttp(app);
    console.log('[lambda] Cold start complete — handler cached');
  }

  return cachedHandler(event, context);
};
