const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://localhost/auth0tutorial';
const client = new pg.Client(connectionString);

export const getAllUsers = (req, res) => {
  client.connect(err => {
    client.query("SELECT * FROM users")
      .then(data => res.status(200).json({ users: data.rows }));
  });
}

export const fetchUser = (req, res) => {
  const { userId } = req.params;
  client.connect(err => {
    client.query(`SELECT * FROM users WHERE id=\'${userId}\'`) //very important to use single quotes
      .then(data => res.status(200).json({ user: data.rows[0] }));
  });
}
