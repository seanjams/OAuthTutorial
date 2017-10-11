import express from 'express';
import * as controller from './controller.js';
import bodyParser from 'body-parser';
import passport from 'passport';
import session from 'express-session';
import { passportConfig } from './passport.js';
import { routerConfig } from './routes.js'

const app = express();
//when we make post requests, we want to have the data
// sent in a predictable body attribute in the request
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  secret: 'secrettexthere',
  saveUninitialized: true,
  resave: true,
}));

passportConfig(passport);
app.use(passport.initialize());
app.use(passport.session());

routerConfig(app, passport);

// required for passport session

app.listen(8080, () => {
  console.log('Example app listening on port 8080!');
});
