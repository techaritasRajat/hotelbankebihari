# Deployment Guide — Shree Banke Bihari Heritage Hotel

Domain: **shribankebiharimaheshwar.com**
Region: **ap-south-1 (Mumbai)** for backend; **us-east-1** for ACM cert (CloudFront)
GitHub: **techaritasRajat/hotelbankebihari**

---

## Infrastructure Overview

```
shribankebiharimaheshwar.com          → CloudFront (prod) → S3 hotel-frontend-prod
stage.shribankebiharimaheshwar.com    → CloudFront (stage) → S3 hotel-frontend-stage
api.shribankebiharimaheshwar.com      → API Gateway → Lambda hotel-api-prod → DynamoDB
api-stage.shribankebiharimaheshwar.com → API Gateway → Lambda hotel-api-stage → DynamoDB
```

---

## One-Time Setup (AWS Console)

### Step 1 — Deploy Backend Stack (Stage)

1. Go to **AWS Console → CloudFormation → Create stack → With new resources**
2. Upload template: `infra/cloudformation/backend.yml`
3. Stack name: `hotel-backend-stage`
4. Parameters:
   - `Env`: `stage`
   - `HostedZoneId`: `Z0569959FN4GGCI80UXP`
   - `ApiCertificateArn`: leave empty (add later after creating cert in ap-south-1)
5. Check **"I acknowledge that AWS CloudFormation might create IAM resources"**
6. Click **Create stack**
7. Wait for status: `CREATE_COMPLETE`
8. Go to **Outputs** tab — copy the `ApiUrl` value (looks like `https://abc123.execute-api.ap-south-1.amazonaws.com`)

### Step 2 — Update Stage SSM Parameter with API URL

1. Go to **Systems Manager → Parameter Store**
2. Click on `/hotel/stage/VITE_API_BASE_URL`
3. Click **Edit** → paste the `ApiUrl` from Step 1
4. Click **Save changes**

> Once the custom domain `api-stage.shribankebiharimaheshwar.com` is set up (requires an ACM cert in ap-south-1), update this parameter to `https://api-stage.shribankebiharimaheshwar.com`

### Step 3 — Deploy Backend Stack (Prod)

Repeat Step 1 with:
- Stack name: `hotel-backend-prod`
- `Env`: `prod`

Copy the `ApiUrl` from Outputs and update `/hotel/prod/VITE_API_BASE_URL` in SSM.

### Step 4 — Deploy Frontend Stack (Stage)

1. Go to **CloudFormation → Create stack**
2. Upload template: `infra/cloudformation/frontend.yml`
3. Stack name: `hotel-frontend-stage`
4. Parameters:
   - `Env`: `stage`
   - `CertificateArn`: `arn:aws:acm:us-east-1:176944445773:certificate/611865ce-2006-4fdc-b7e0-15b35803cf99`
   - `HostedZoneId`: `Z0569959FN4GGCI80UXP`
5. Create stack → wait for `CREATE_COMPLETE`
6. Go to **Outputs** tab — copy `DistributionId` (e.g. `E1ABC2DEFG3HIJ`)

### Step 5 — Deploy Frontend Stack (Prod)

Repeat Step 4 with:
- Stack name: `hotel-frontend-prod`
- `Env`: `prod`

Copy `DistributionId` from Outputs.

### Step 6 — Deploy Pipeline Stack

1. Go to **CloudFormation → Create stack**
2. Upload template: `infra/cloudformation/pipeline.yml`
3. Stack name: `hotel-cicd-pipeline`
4. Parameters (fill in the values from previous stack outputs):

| Parameter | Where to find it |
|---|---|
| `CodeStarConnectionArn` | Pre-filled: `arn:aws:codeconnections:ap-south-1:176944445773:...` |
| `GitHubOwner` | Pre-filled: `techaritasRajat` |
| `GitHubRepo` | Pre-filled: `hotelbankebihari` |
| `StageFrontendBucket` | hotel-frontend-stage Outputs → BucketName |
| `StageCFDistributionId` | hotel-frontend-stage Outputs → DistributionId |
| `ProdFrontendBucket` | hotel-frontend-prod Outputs → BucketName |
| `ProdCFDistributionId` | hotel-frontend-prod Outputs → DistributionId |
| `StageLambdaFunctionName` | hotel-backend-stage Outputs → LambdaFunctionName |
| `ProdLambdaFunctionName` | hotel-backend-prod Outputs → LambdaFunctionName |
| `NotificationEmail` | Your email for prod approval alerts (optional) |

5. Check IAM capabilities → **Create stack**

---

## CI/CD Pipeline Behaviour

### Stage Pipeline (automatic)

- **Trigger**: every push to `development` branch
- **What happens**:
  1. CodePipeline pulls source from GitHub
  2. Two parallel CodeBuild jobs:
     - **Frontend**: fetches `VITE_API_BASE_URL` from SSM, runs `npm run build`, syncs `dist/` to S3, invalidates CloudFront
     - **Backend**: runs `npm ci --omit=dev`, zips `backend/`, calls `lambda update-function-code`
  3. Stage site updates at `https://stage.shribankebiharimaheshwar.com`

### Prod Pipeline (manual approval required)

- **Trigger**: every push to `master` branch
- **What happens**:
  1. Source pulled from GitHub
  2. Two parallel CodeBuild build jobs (same as stage, no deploy)
  3. **Manual Approval gate** — go to CodePipeline console → click **Review** → **Approve**
     - (If `NotificationEmail` was set, you get an email with an approve link)
  4. After approval: two parallel deploy jobs run
  5. Prod site updates at `https://shribankebiharimaheshwar.com`

### How to approve a prod deployment

1. Go to **AWS Console → CodePipeline → hotel-prod-pipeline**
2. Find the **Approve** stage — it shows "Waiting for approval"
3. Click **Review** → add a comment → click **Approve**
4. The Deploy stage starts immediately

---

## Deploying Manually (Without Pipeline)

If you need to deploy without the pipeline (e.g. first deploy):

### Frontend Manual Deploy

```bash
# Build
VITE_API_BASE_URL=https://api-stage.shribankebiharimaheshwar.com npm run build

# Upload to S3
aws s3 sync dist/ s3://hotel-frontend-stage --delete --region ap-south-1

# Invalidate CloudFront
aws cloudfront create-invalidation --distribution-id <DISTRIBUTION_ID> --paths "/*"
```

### Backend Manual Deploy

```bash
cd backend
npm ci --omit=dev
zip -r ../function.zip . --exclude "scripts/*" ".env*" ".gitignore"
cd ..
aws lambda update-function-code \
  --function-name hotel-api-stage \
  --zip-file fileb://function.zip \
  --region ap-south-1
```

---

## Adding API Custom Domain (Optional — requires ap-south-1 ACM cert)

The API Gateway is deployed without a custom domain initially (uses the default `execute-api` URL).
To enable `api[-stage].shribankebiharimaheshwar.com`:

1. In **AWS Console → ACM → ap-south-1** region: request a new wildcard cert for `*.shribankebiharimaheshwar.com`
2. Validate it via DNS (click "Create records in Route 53")
3. Once issued, copy the cert ARN
4. Update the backend stack:
   - CloudFormation → `hotel-backend-stage` → **Update** → use same template
   - Add `ApiCertificateArn`: the new ap-south-1 cert ARN
   - Update the stack
5. Update SSM parameter `/hotel/stage/VITE_API_BASE_URL` to `https://api-stage.shribankebiharimaheshwar.com`
6. Trigger a new stage pipeline run (push any commit to `development`)

---

## CloudFormation Stack Summary

| Stack name | Template | Deploys |
|---|---|---|
| `hotel-backend-stage` | `infra/cloudformation/backend.yml` (Env=stage) | DynamoDB, Lambda, API Gateway |
| `hotel-backend-prod` | `infra/cloudformation/backend.yml` (Env=prod) | DynamoDB, Lambda, API Gateway |
| `hotel-frontend-stage` | `infra/cloudformation/frontend.yml` (Env=stage) | S3, CloudFront, Route 53 |
| `hotel-frontend-prod` | `infra/cloudformation/frontend.yml` (Env=prod) | S3, CloudFront, Route 53 |
| `hotel-cicd-pipeline` | `infra/cloudformation/pipeline.yml` | CodePipeline, CodeBuild, IAM |

---

## Buildspec Files Reference

| File | Used by |
|---|---|
| `buildspec-frontend.yml` | Stage pipeline — build + deploy in one step |
| `buildspec-frontend-build.yml` | Prod pipeline — build only (output artifact) |
| `buildspec-frontend-deploy.yml` | Prod pipeline — deploy artifact post-approval |
| `buildspec-backend.yml` | Stage pipeline — build + deploy in one step |
| `buildspec-backend-build.yml` | Prod pipeline — build only (output function.zip) |
| `buildspec-backend-deploy.yml` | Prod pipeline — deploy function.zip post-approval |

---

## SSM Parameters Reference

All parameters are in region `ap-south-1`.

| Parameter | Type | Description |
|---|---|---|
| `/hotel/stage/JWT_SECRET` | SecureString | JWT signing secret for stage |
| `/hotel/stage/ADMIN_USERNAME` | String | Admin login username for stage |
| `/hotel/stage/ADMIN_PASSWORD_HASH` | SecureString | bcrypt hash of admin password |
| `/hotel/stage/CORS_ORIGIN` | String | `https://stage.shribankebiharimaheshwar.com` |
| `/hotel/stage/VITE_API_BASE_URL` | String | API Gateway URL for stage frontend |
| `/hotel/prod/JWT_SECRET` | SecureString | JWT signing secret for prod |
| `/hotel/prod/ADMIN_USERNAME` | String | Admin login username for prod |
| `/hotel/prod/ADMIN_PASSWORD_HASH` | SecureString | bcrypt hash of admin password |
| `/hotel/prod/CORS_ORIGIN` | String | `https://shribankebiharimaheshwar.com` |
| `/hotel/prod/VITE_API_BASE_URL` | String | API Gateway URL for prod frontend |
