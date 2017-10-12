import * as controller from './controller.js';
import path from 'path';

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}

export const routerConfig = (app, passport) => {
  app.get('/api/users', controller.getAllUsers);
  app.get('/api/users/:userId', controller.fetchUser);

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
  });
  // app.get('/api/users/:userId', controller.fetchUser);
  app.get('/profile', isLoggedIn, (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/profile.html'));
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
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
  });
}
