#!/usr/bin/env bash
# deploy-frontend.sh
# Deploys (or updates) the frontend CloudFormation stack for a given environment.
# Usage: ./infra/scripts/deploy-frontend.sh stage
#        ./infra/scripts/deploy-frontend.sh prod
#
# Prerequisites: AWS CLI configured with AdministratorAccess

set -euo pipefail

ENV=${1:-stage}

if [[ "$ENV" != "stage" && "$ENV" != "prod" ]]; then
  echo "Error: ENV must be 'stage' or 'prod'"
  exit 1
fi

STACK_NAME="hotel-frontend-${ENV}"
TEMPLATE_FILE="$(dirname "$0")/../cloudformation/frontend.yml"
REGION="ap-south-1"

# ACM cert must be in us-east-1 — it's hardcoded as default in the template
echo "Deploying frontend stack: $STACK_NAME (env=$ENV, region=$REGION)"

aws cloudformation deploy \
  --template-file "$TEMPLATE_FILE" \
  --stack-name "$STACK_NAME" \
  --parameter-overrides Env=$ENV \
  --capabilities CAPABILITY_NAMED_IAM \
  --region "$REGION" \
  --no-fail-on-empty-changeset

echo ""
echo "Stack outputs:"
aws cloudformation describe-stacks \
  --stack-name "$STACK_NAME" \
  --region "$REGION" \
  --query "Stacks[0].Outputs[*].[OutputKey,OutputValue]" \
  --output table

echo ""
echo "Note: Copy the DistributionId from above — you'll need it when deploying pipeline.yml"
