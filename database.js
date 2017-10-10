const pg = require('pg');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
// load the auth variables
var configAuth = require('./auth.js');

const connectionString = process.env.DATABASE_URL || 'postgres://localhost/auth0tutorial';

const client = new pg.Client(connectionString);

export function getAllUsers(req, res) {
  client.connect( function (err) {
    client.query("SELECT * FROM users")
      .then( function (data) {
        return res.status(200).json({ users: data.rows });
        client.end();
      }, function (err) {
        console.log(err);
        return null;
      });
  });
}

export function fetchUser(req, res) {
  const { userId } = req.params;
  client.connect( function (err) {
    client.query(`SELECT * FROM users WHERE id=\'${userId}\'`) //very important to use single quotes
      .then( function (data) {
        return res.status(200).json({ user: data.rows[0] });
        client.end();
      }, function (err) {
        console.log(err);
        return null;
      });
  });
}

export function createUser(req, res) {
  const { name, email } = req.body;
  client.connect( function (err) {
    client.query(`INSERT INTO users (name, email) VALUES (\'${name}\', \'${email}\') RETURNING *`) //very important to use single quotes
      .then( function (data) {
        return res.status(200).json({ user: data.rows[0] });
        client.end();
      }, function (err) {
        console.log(err);
        return null;
      });
  });
}

export function addNewUser(newUser) {
  const { name, email, googleId, token } = newUser;
  client.connect( function (err) {
    client.query(`INSERT INTO users (name, email, googleId, token) VALUES (\'${name}\', \'${email}\', \'${googleId}\', \'${token}\') RETURNING *`) //very important to use single quotes
  });
}

export function find(id) {
  client.connect( function (err) {
    return client.query(`SELECT * FROM users WHERE id=\'${id}\'`) //very important to use single quotes
  });
}

export function findByGoogleId(googleId) {
  client.connect( function (err) {
    return client.query(`SELECT * FROM users WHERE googleId=\'${googleId}\'`) //very important to use single quotes
  });
}
