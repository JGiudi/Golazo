const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Leer variables de .env.local manualmente para evitar dependencias extra
const envPath = path.resolve(__dirname, '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
  const [key, value] = line.split('=');
  if (key && value) env[key.trim()] = value.trim();
});

const url = env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(url, anonKey);

async function check() {
  console.log('--- Checking HORARIOS ---');
  const { data: horarios, error: hError } = await supabase.from('horarios').select('*').limit(5);
  if (hError) console.error(hError);
  else console.log('Horarios:', JSON.stringify(horarios, null, 2));

  console.log('--- Checking CANCHAS ---');
  const { data: canchas, error: cError } = await supabase.from('canchas').select('id, nombre').limit(5);
  if (cError) console.error(cError);
  else console.log('Canchas:', JSON.stringify(canchas, null, 2));
}

check();
