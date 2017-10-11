import * as controller from './controller.js';

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}

export const routerConfig = (app, passport) => {
  app.get('/', (req, res) => {
    res.send("Index Page");
  });
  app.get('/api/users/:userId', controller.fetchUser);
  app.get('/profile', isLoggedIn, controller.getAllUsers);

  app.get('/auth/google',
    passport.authenticate('google', {
      scope : ['profile', 'email']
    })
  );

  app.get('/auth/google/callback',
    passport.authenticate('google', {
      successRedirect: '/profile',
      failureredirect: '/'
    })
  );

  app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });
}
