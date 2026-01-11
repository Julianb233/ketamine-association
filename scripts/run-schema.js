const fs = require('fs');
const path = require('path');

const SUPABASE_URL = 'https://ugcgwohizsqsnqsveygj.supabase.co';
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVnY2d3b2hpenNxc25xc3ZleWdqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NzkzMjI2OSwiZXhwIjoyMDgzNTA4MjY5fQ.QShs4xdG78dmuaYLY25asndmS7-CECJyyFHwonQIGn4';

async function runSQL() {
  const sqlPath = path.join(__dirname, '..', 'prisma', 'supabase_schema.sql');

  if (!fs.existsSync(sqlPath)) {
    // Try /tmp location
    const tmpPath = '/tmp/supabase_schema.sql';
    if (!fs.existsSync(tmpPath)) {
      console.error('Schema file not found at', sqlPath, 'or', tmpPath);
      process.exit(1);
    }
  }

  const sql = fs.readFileSync(fs.existsSync(sqlPath) ? sqlPath : '/tmp/supabase_schema.sql', 'utf8');

  console.log('Executing SQL schema via Supabase REST API...');
  console.log('SQL length:', sql.length, 'characters');

  try {
    // Use the Supabase SQL endpoint
    const response = await fetch(`${SUPABASE_URL}/rest/v1/rpc/exec_sql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SERVICE_ROLE_KEY,
        'Authorization': `Bearer ${SERVICE_ROLE_KEY}`,
      },
      body: JSON.stringify({ sql_query: sql }),
    });

    if (!response.ok) {
      // Try alternative approach - use pg_query
      console.log('RPC method not available, trying direct SQL execution...');

      // Split SQL into statements and execute individually
      const statements = sql
        .split(';')
        .map(s => s.trim())
        .filter(s => s.length > 0 && !s.startsWith('--'));

      console.log(`Found ${statements.length} SQL statements`);

      let success = 0;
      let failed = 0;

      for (let i = 0; i < statements.length; i++) {
        const stmt = statements[i];
        const preview = stmt.substring(0, 60).replace(/\n/g, ' ');

        // For CREATE statements, we can check via information_schema
        if (stmt.toUpperCase().startsWith('CREATE TYPE')) {
          console.log(`[${i + 1}/${statements.length}] Skipping TYPE (needs direct DB access): ${preview}...`);
          continue;
        }

        console.log(`[${i + 1}/${statements.length}] ${preview}...`);
      }

      console.log('\n⚠️  Cannot execute DDL statements via REST API.');
      console.log('Please run the SQL directly in Supabase Dashboard:');
      console.log('https://supabase.com/dashboard/project/ugcgwohizsqsnqsveygj/sql/new');
      return;
    }

    const result = await response.json();
    console.log('Success:', result);
  } catch (error) {
    console.error('Error:', error.message);
    console.log('\n⚠️  Please run the SQL directly in Supabase Dashboard:');
    console.log('https://supabase.com/dashboard/project/ugcgwohizsqsnqsveygj/sql/new');
  }
}

runSQL();
