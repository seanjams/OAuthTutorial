import express from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';
import session from 'express-session';
import * as controller from './controller.js';
import { passportConfig } from './passport.js';
import { routerConfig } from './routes.js';

//start the train
const app = express();

// //when we make post requests, we want to have the data sent in a body attribute
app.use(bodyParser.urlencoded({ extended: true }));

//session middleware necessary to save and persists a users login session
//the session key can be whatever you want, and the other two values should usually always be false
//docs: https://github.com/expressjs/session
app.use(session({
  secret: 'PutAnythingYouWantHere',
  saveUninitialized: false,
  resave: false,
}));

//connects passport to key functions needed to communicate with the session and with Google,
//then connects passport to app
passportConfig(passport);
app.use(passport.initialize());
app.use(passport.session());

//connects app to all API endpoints definied in ./routes.js
routerConfig(app, passport);

//serves API endpoints at http://localhost:8080
app.listen(8080, () => {
  console.log('Example app listening on port 8080!');
});
