const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Use Supabase client with service role key for admin operations
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { persistSession: false }
});

async function runSQL() {
  const sqlPath = path.join(__dirname, '..', 'prisma', 'supabase_schema.sql');
  const fullSQL = fs.readFileSync(sqlPath, 'utf8');

  // Split SQL into individual statements
  const statements = fullSQL
    .split(';')
    .map(s => s.trim())
    .filter(s => s.length > 0 && !s.startsWith('--'));

  console.log(`Found ${statements.length} SQL statements to execute`);
  console.log('Supabase URL:', supabaseUrl);

  let successCount = 0;
  let errorCount = 0;

  for (let i = 0; i < statements.length; i++) {
    const stmt = statements[i] + ';';
    const preview = stmt.substring(0, 60).replace(/\n/g, ' ');

    try {
      const { data, error } = await supabase.rpc('exec_sql', { sql: stmt });

      if (error) {
        // Try using the postgres extension directly
        const { error: err2 } = await supabase.from('_sql').select('*').limit(0);
        if (err2) {
          console.log(`[${i + 1}/${statements.length}] Skipping (no exec method): ${preview}...`);
        }
        errorCount++;
      } else {
        console.log(`[${i + 1}/${statements.length}] ✓ ${preview}...`);
        successCount++;
      }
    } catch (err) {
      console.log(`[${i + 1}/${statements.length}] ✗ ${preview}... - ${err.message}`);
      errorCount++;
    }
  }

  console.log(`\nCompleted: ${successCount} succeeded, ${errorCount} failed`);

  // Try to list tables using Supabase
  try {
    const { data, error } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public');

    if (!error && data) {
      console.log('Tables in database:', data.map(r => r.table_name).join(', '));
    }
  } catch (e) {
    console.log('Could not list tables:', e.message);
  }
}

runSQL();
