const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://localhost/auth0tutorial';

const client = new pg.Client(connectionString);

client.connect( function (err) {
  if (err) {
    console.log('connection error', err);
  } else {
    const query = client.query(
      'SELECT * FROM users'
    );
  }
});


// function getAllPuppies(req, res, next) {
//   db.any('select * from pups')
//     .then(function (data) {
//       res.status(200)
//         .json({
//           status: 'success',
//           data: data,
//           message: 'Retrieved ALL puppies'
//         });
//     })
//     .catch(function (err) {
//       return next(err);
//     });
// }
