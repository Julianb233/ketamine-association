const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://ugcgwohizsqsnqsveygj.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVnY2d3b2hpenNxc25xc3ZleWdqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NzkzMjI2OSwiZXhwIjoyMDgzNTA4MjY5fQ.QShs4xdG78dmuaYLY25asndmS7-CECJyyFHwonQIGn4';

console.log('Supabase URL:', supabaseUrl);
console.log('Key type:', supabaseKey.startsWith('eyJ') ? 'JWT' : 'Other');

const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
  try {
    // Try to query the database to wake it up
    console.log('\nChecking database connection via REST API...');

    // This queries the pg_catalog which should always exist
    const { data, error } = await supabase
      .from('pg_catalog.pg_tables')
      .select('tablename')
      .limit(5);

    if (error) {
      console.log('Error querying pg_tables:', error.message);
      console.log('Error code:', error.code);
      console.log('Error details:', JSON.stringify(error, null, 2));
    } else {
      console.log('Tables found:', data);
    }

    // Try to list schemas
    console.log('\nTrying RPC call...');
    const { data: rpcData, error: rpcError } = await supabase.rpc('version');

    if (rpcError) {
      console.log('RPC error:', rpcError.message);
    } else {
      console.log('PostgreSQL version:', rpcData);
    }

    // Check auth.users as a baseline
    console.log('\nChecking if project is accessible...');
    const { count, error: countError } = await supabase
      .from('auth.users')
      .select('*', { count: 'exact', head: true });

    if (countError) {
      console.log('Auth users check:', countError.message);
    } else {
      console.log('Auth users count:', count);
    }

  } catch (err) {
    console.log('Exception:', err.message);
  }
}

check();
