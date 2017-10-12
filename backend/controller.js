const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://localhost/auth0tutorial';

export const getAllUsers = (req, res) => {
  const client = new pg.Client(connectionString);
  client.connect(err => {
    client.query("SELECT * FROM users")
      .then(data => {
        res.status(200).json({ users: data.rows });
        client.end();
      })
  });
}

export const fetchUser = (req, res) => {
  const client = new pg.Client(connectionString);
  const { userId } = req.params;
  client.connect(err => {
    client.query(`SELECT * FROM users WHERE id=\'${userId}\'`) //very important to use single quotes
      .then(data => {
        res.status(200).json({ user: data.rows[0] });
        client.end();
      });
  });
}
