const { Client } = require('pg');

// Environment variables should define which region we are in
const isSecondaryRegion = process.env.AWS_REGION === 'ap-southeast-2';
const dbHost = isSecondaryRegion 
  ? process.env.DB_SECONDARY_HOST  // Aurora Secondary Endpoint
  : process.env.DB_PRIMARY_HOST;   // Aurora Primary Endpoint

const client = new Client({
  host: dbHost,
  user: 'admin',
  password: 'password123',
  database: 'thaipay',
  port: 5432,
});

async function run() {
  await client.connect();
  console.log(`Connected to DB at ${dbHost}`);

  // In Secondary region, write forwarding must be supported by the driver/config
  // if you want to write to the secondary endpoint.
  try {
    const res = await client.query('INSERT INTO transactions (amount, status) VALUES ($1, $2) RETURNING *', [100.00, 'SUCCESS']);
    console.log('Transaction saved:', res.rows[0]);
  } catch (err) {
    console.error('Error executing query', err.stack);
  } finally {
    await client.end();
  }
}

run();
