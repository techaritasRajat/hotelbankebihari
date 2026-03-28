/**
 * AWS Lambda entry point.
 * Wraps the Express app with serverless-http.
 * Phase 1 will add SSM secret loading before createApp() is called.
 */

import serverlessHttp from 'serverless-http';
import { createApp } from './src/app.js';

const app = createApp();

export const handler = serverlessHttp(app);
