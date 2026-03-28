/**
 * Starts DynamoDB Local on port 8000 using the dynamodb-local npm package.
 * Downloads the JAR on first run (requires internet connection).
 * Run: node scripts/startDynamo.js
 *
 * Alternative (if Docker is available): docker compose up -d dynamodb-local
 */

import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const DynamoDbLocal = require('dynamodb-local');

const PORT = 8000;

console.log(`Starting DynamoDB Local on port ${PORT}...`);
console.log('(First run downloads the JAR — this may take a moment)\n');

DynamoDbLocal.launch(PORT, null, ['-sharedDb'], false)
  .then((proc) => {
    console.log(`DynamoDB Local started (pid: ${proc.pid})`);
    console.log(`Endpoint: http://localhost:${PORT}`);
    console.log('\nPress Ctrl+C to stop.\n');

    proc.on('exit', (code) => {
      console.log(`DynamoDB Local exited with code ${code}`);
    });
  })
  .catch((err) => {
    console.error('Failed to start DynamoDB Local:', err.message);
    process.exit(1);
  });
