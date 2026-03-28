/**
 * Generates a bcrypt hash of ADMIN_PASSWORD from .env and prints it.
 * Copy the printed hash into ADMIN_PASSWORD_HASH in your .env file.
 * Run: npm run db:seed
 */

import bcrypt from 'bcryptjs';
import 'dotenv/config';

const password = process.env.ADMIN_PASSWORD;

if (!password) {
  console.error('Error: ADMIN_PASSWORD is not set in .env');
  process.exit(1);
}

const SALT_ROUNDS = 12;

async function main() {
  const hash = await bcrypt.hash(password, SALT_ROUNDS);

  console.log('\n--- Admin Seed ---');
  console.log(`ADMIN_USERNAME : ${process.env.ADMIN_USERNAME || 'admin'}`);
  console.log(`ADMIN_PASSWORD : ${password}`);
  console.log(`ADMIN_PASSWORD_HASH=${hash}`);
  console.log('\nCopy the ADMIN_PASSWORD_HASH line above into your .env file.\n');
}

main().catch((err) => {
  console.error('Error:', err.message);
  process.exit(1);
});
