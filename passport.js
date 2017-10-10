const { find, findByGoogleId, addNewUser } = require('./database.js');

export function passportConfig(passport) {
  // used to serialize the user for the session
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser(function(id, done) {
    find(id).then(
      function (data) {
        const user = data.rows[0];
        done(null, user);
        client.end();
      },
      function (err) {
        done(err, null);
      }
    );
  });

  passport.use(new GoogleStrategy({

      clientID        : configAuth.googleAuth.clientID,
      clientSecret    : configAuth.googleAuth.clientSecret,
      callbackURL     : configAuth.googleAuth.callbackURL,

  },
  function(token, refreshToken, profile, done) {

    // make the code asynchronous
    // User.findOne won't fire until we have all our data back from Google
    process.nextTick(function() {

        // try to find the user based on their google id
      findByGoogleId(profile.id).then(
        function(data) {
          var user = data.rows[0]
          // if a user is found, log them in
          if (user) {
            done(null, user);
            // client.end();
          } else {
            //create new use
            var newUser = {
              name: profile.displayName
              email: profile.emails[0].value
              googleId: profile.id
              token: token
            };

            // save the user and log them in
            addNewUser(newUser).then( function (data) {
              var user = data.rows[0];
              if (user) {
                done(null, user);
                // client.end();
              } else {
                console.log("Error adding user");
              }
            });
          }
        }
      );
    });
  }));
}
