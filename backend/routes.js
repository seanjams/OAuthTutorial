import * as controller from './controller.js';
import path from 'path';

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}

export const routerConfig = (app, passport) => {
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
  });
  // app.get('/api/users/:userId', controller.fetchUser);
  app.get('/profile', isLoggedIn, (req, res) => {
    res.send("Welcome!!")
  });

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
    req.session.destroy();
    res.send('logged out');
  });
}
