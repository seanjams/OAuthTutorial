const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://localhost/auth0tutorial';

const client = new pg.Client(connectionString);

client.connect( function (err) {
  // client.query("CREATE TABLE users (id SERIAL PRIMARY KEY, name VARCHAR(40) NOT NULL, email VARCHAR(40) NOT NULL, googleId BIGINT, token VARCHAR(40))")
  client.query("DELETE FROM users WHERE email='seanvoreilly2@gmail.com'")
    .then( function (data) {
      console.log("Users table altered");
      client.end()
    });
});
// client.query("ALTER TABLE users ALTER COLUMN googleId TYPE BIGINT")
