const { Client } = require('pg');
const client = new Client('postgresql://postgres:%40ali%40husnain%401943@localhost:5432/automation_UTP2');

async function main() {
  await client.connect();
  const tables = ['jobs_selected', 'product', 'blog', 'services'];
  for (const table of tables) {
    const res = await client.query('SELECT column_name, data_type FROM information_schema.columns WHERE table_name = $1', [table]);
    console.log(`=== ${table} ===`);
    res.rows.forEach(r => console.log(`${r.column_name} (${r.data_type})`));
  }
  await client.end();
}

main().catch(console.error);
