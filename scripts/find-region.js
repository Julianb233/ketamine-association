const { Client } = require('pg');

const regions = [
  'us-west-1', 'us-west-2', 'us-east-2',
  'eu-west-1', 'eu-west-2', 'eu-central-1',
  'ap-southeast-1', 'ap-southeast-2', 'ap-northeast-1'
];

const projectRef = 'ugcgwohizsqsnqsveygj';
const password = 'Oceanfront3381$';

async function tryRegion(region) {
  const client = new Client({
    connectionString: `postgresql://postgres.${projectRef}:${password}@aws-0-${region}.pooler.supabase.com:6543/postgres`,
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 10000
  });

  try {
    await client.connect();
    console.log(`✓ SUCCESS: ${region}`);
    await client.end();
    return true;
  } catch (e) {
    console.log(`✗ ${region}: ${e.message}`);
    await client.end().catch(() => {});
    return false;
  }
}

async function main() {
  console.log('Testing Supabase pooler regions...\n');
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

  for (const region of regions) {
    const success = await tryRegion(region);
    if (success) {
      console.log(`\nUse this connection string:`);
      console.log(`postgresql://postgres.${projectRef}:****@aws-0-${region}.pooler.supabase.com:6543/postgres`);
      break;
    }
  }
}

main();
