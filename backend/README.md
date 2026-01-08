# Cartoon Generator Backend

- npm init
- npm install openai
- npm install --save-dev typescript @types/node @types/aws-lambda
- npm run build
- npm run test:local
- aws configure
- aws sts get-caller-identity
- export $OPENAI_API_KEY="openai-api-key"
- serverless deploy
- curl -X POST https://xxxxxxxxx.execute-api.us-east-1.amazonaws.com/dev/generate \
  -H "Content-Type: application/json" \
  -d '{"subject": "test"}'
