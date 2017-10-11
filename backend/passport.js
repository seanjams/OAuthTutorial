import pg from 'pg';
import { find, findByGoogleId, addNewUser } from './controller.js';
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';
import { googleConfig } from './auth.js';

const connectionString = process.env.DATABASE_URL || 'postgres://localhost/auth0tutorial';

export const passportConfig = (passport) => {
  let client = new pg.Client(connectionString);
  // used to serialize the user for the session
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser((id, done) => {
    client.connect(err => {
      client.query(`SELECT * FROM users WHERE id=\'${id}\'`)
        .then(
          data => {
            const user = data.rows[0];
            done(null, user);
            // client.end();
          },
          err => {
            done(err, null);
          }
        );
    });
  });

  passport.use(new GoogleStrategy({
    clientID: googleConfig.clientID,
    clientSecret: googleConfig.clientSecret,
    callbackURL: googleConfig.callbackURL,
  },
  (token, refreshToken, profile, done) => {


    // make the code asynchronous
    // User.findOne won't fire until we have all our data back from Google
    process.nextTick(() => {
      let client = new pg.Client(connectionString);
        // try to find the user based on their google id
      // findByGoogleId(profile.id)
      client.connect(err => {
        client.query(`SELECT * FROM users WHERE googleId=\'${profile.id}\'`)
          .then(
            data => {
              let user = data.rows[0]
              // if a user is found, log them in
              if (user) {
                done(null, user);
              } else {
                client.query(`INSERT INTO users (name, email, googleId, token) VALUES (\'${profile.name.givenName}\', \'${profile.emails[0].value}\', \'${profile.id}\', \'${token}\') RETURNING *`)
                  .then(data => {
                    let user = data.rows[0];
                    if (user) {
                      done(null, user);
                    }
                  });
              }
            }
          );
      });
    });
  }));
}
