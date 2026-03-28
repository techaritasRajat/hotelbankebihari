#!/usr/bin/env bash
# deploy-backend.sh
# Deploys (or updates) the backend CloudFormation stack for a given environment.
# Usage: ./infra/scripts/deploy-backend.sh stage
#        ./infra/scripts/deploy-backend.sh prod [API_CERT_ARN]
#
# Prerequisites: AWS CLI configured with AdministratorAccess

set -euo pipefail

ENV=${1:-stage}
API_CERT_ARN=${2:-""}

if [[ "$ENV" != "stage" && "$ENV" != "prod" ]]; then
  echo "Error: ENV must be 'stage' or 'prod'"
  exit 1
fi

STACK_NAME="hotel-backend-${ENV}"
TEMPLATE_FILE="$(dirname "$0")/../cloudformation/backend.yml"
REGION="ap-south-1"

echo "Deploying backend stack: $STACK_NAME (env=$ENV, region=$REGION)"

PARAMS="Env=$ENV"
if [[ -n "$API_CERT_ARN" ]]; then
  PARAMS="$PARAMS ApiCertificateArn=$API_CERT_ARN"
fi

aws cloudformation deploy \
  --template-file "$TEMPLATE_FILE" \
  --stack-name "$STACK_NAME" \
  --parameter-overrides $PARAMS \
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
echo "Done! Update SSM parameter /hotel/${ENV}/VITE_API_BASE_URL with the ApiUrl above."
