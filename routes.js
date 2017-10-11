import { getAllUsers } from './controller.js';

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}

export const routerConfig = (app, passport) => {
  app.get('/profile', isLoggedIn, getAllUsers);

  app.get('/auth/google',
    passport.authenticate('google', {
      scope : ['profile', 'email']
    })
  );

  app.get('/auth/google/callback',
    passport.authenticate('google', {
      successRedirect: '/api/users',
      failureredirect: '/api/users'
    })
  );
}
