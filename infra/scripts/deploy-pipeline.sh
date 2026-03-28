#!/usr/bin/env bash
# deploy-pipeline.sh
# Deploys the CI/CD pipeline CloudFormation stack.
# Run this AFTER both frontend and backend stacks are deployed for BOTH environments.
# Usage: ./infra/scripts/deploy-pipeline.sh
#
# Prerequisites:
#   1. hotel-frontend-stage and hotel-frontend-prod stacks deployed
#   2. hotel-backend-stage and hotel-backend-prod stacks deployed
#   3. AWS CLI configured with AdministratorAccess

set -euo pipefail

REGION="ap-south-1"
TEMPLATE_FILE="$(dirname "$0")/../cloudformation/pipeline.yml"
STACK_NAME="hotel-cicd-pipeline"

# ── Fetch values from existing stack exports ─────────────────────────────────
echo "Reading stack exports..."

STAGE_FRONTEND_BUCKET=$(aws cloudformation list-exports \
  --region "$REGION" \
  --query "Exports[?Name=='hotel-frontend-stage-bucket-name'].Value" \
  --output text)

STAGE_CF_DISTRIBUTION_ID=$(aws cloudformation list-exports \
  --region "$REGION" \
  --query "Exports[?Name=='hotel-frontend-stage-distribution-id'].Value" \
  --output text)

PROD_FRONTEND_BUCKET=$(aws cloudformation list-exports \
  --region "$REGION" \
  --query "Exports[?Name=='hotel-frontend-prod-bucket-name'].Value" \
  --output text)

PROD_CF_DISTRIBUTION_ID=$(aws cloudformation list-exports \
  --region "$REGION" \
  --query "Exports[?Name=='hotel-frontend-prod-distribution-id'].Value" \
  --output text)

STAGE_LAMBDA=$(aws cloudformation list-exports \
  --region "$REGION" \
  --query "Exports[?Name=='hotel-backend-stage-lambda-name'].Value" \
  --output text)

PROD_LAMBDA=$(aws cloudformation list-exports \
  --region "$REGION" \
  --query "Exports[?Name=='hotel-backend-prod-lambda-name'].Value" \
  --output text)

echo ""
echo "Collected values:"
echo "  Stage frontend bucket:  $STAGE_FRONTEND_BUCKET"
echo "  Stage CF distribution:  $STAGE_CF_DISTRIBUTION_ID"
echo "  Prod frontend bucket:   $PROD_FRONTEND_BUCKET"
echo "  Prod CF distribution:   $PROD_CF_DISTRIBUTION_ID"
echo "  Stage Lambda:           $STAGE_LAMBDA"
echo "  Prod Lambda:            $PROD_LAMBDA"
echo ""

# Optional: prompt for notification email
read -p "Enter email for prod approval notifications (press Enter to skip): " NOTIFICATION_EMAIL

aws cloudformation deploy \
  --template-file "$TEMPLATE_FILE" \
  --stack-name "$STACK_NAME" \
  --parameter-overrides \
    StageFrontendBucket="$STAGE_FRONTEND_BUCKET" \
    StageCFDistributionId="$STAGE_CF_DISTRIBUTION_ID" \
    ProdFrontendBucket="$PROD_FRONTEND_BUCKET" \
    ProdCFDistributionId="$PROD_CF_DISTRIBUTION_ID" \
    StageLambdaFunctionName="$STAGE_LAMBDA" \
    ProdLambdaFunctionName="$PROD_LAMBDA" \
    NotificationEmail="$NOTIFICATION_EMAIL" \
  --capabilities CAPABILITY_NAMED_IAM \
  --region "$REGION" \
  --no-fail-on-empty-changeset

echo ""
echo "Pipeline stack deployed!"
echo ""
aws cloudformation describe-stacks \
  --stack-name "$STACK_NAME" \
  --region "$REGION" \
  --query "Stacks[0].Outputs[*].[OutputKey,OutputValue]" \
  --output table
