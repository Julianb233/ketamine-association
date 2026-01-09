const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

// Use pooler connection - the correct format for Supabase pooler
const connectionString = process.env.DATABASE_URL ||
  'postgresql://postgres.ugcgwohizsqsnqsveygj:Oceanfront3381$@aws-0-us-east-1.pooler.supabase.com:6543/postgres?sslmode=require';

console.log('Connecting to:', connectionString.replace(/:[^:@]+@/, ':****@'));

const client = new Client({
  connectionString,
  ssl: {
    rejectUnauthorized: false,
    checkServerIdentity: () => undefined
  }
});

async function runSQL() {
  const sqlPath = path.join(__dirname, '..', 'prisma', 'supabase_schema.sql');
  const sql = fs.readFileSync(sqlPath, 'utf8');

  try {
    console.log('Attempting connection...');
    await client.connect();
    console.log('Connected successfully!');

    // Execute the full SQL
    console.log('Executing schema SQL...');
    await client.query(sql);
    console.log('Schema created successfully!');

    // Verify tables
    const result = await client.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
      ORDER BY table_name
    `);

    console.log('\nTables created:');
    result.rows.forEach(row => console.log('  -', row.table_name));

    await client.end();
    console.log('\nDone!');
  } catch (err) {
    console.error('Error:', err.message);
    if (err.code) console.error('Code:', err.code);
    await client.end().catch(() => {});
    process.exit(1);
  }
}

runSQL();
