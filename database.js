const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'pg://localhost:3000/auth0tutorial';

const client = new pg.Client(connectionString);
client.connect();

const query = client.query(
  'CREATE TABLE users(id SERIAL PRIMARY KEY, name VARCHAR(40) not null, email VARCHAR(40) not null)'
);

client.end();
