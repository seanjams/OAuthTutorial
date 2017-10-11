import express from 'express';
import * as controller from './controller.js';
import bodyParser from 'body-parser';
import passport from 'passport';
import { passportConfig } from './passport.js';
import { routerConfig } from './routes.js'

const app = express();
//when we make post requests, we want to have the data
// sent in a predictable body attribute in the request
app.use(bodyParser.urlencoded({ extended: true }));

passportConfig(passport);
app.use(passport.initialize());
routerConfig(app, passport);



app.listen(8080, () => {
  console.log('Example app listening on port 8080!');
});
