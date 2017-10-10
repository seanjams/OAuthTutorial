import express from 'express';
import * as db from './database.js';
import bodyParser from 'body-parser';
import passport from 'passport';
import { passportConfig } from 'passport.js';
import { routerConfig } from 'routes.js'

const app = express();

//when we make post requests, we want to have the data
// sent in a predictable body attribute in the request
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/api/users', db.getAllUsers);
app.get('/api/users/:userId', db.fetchUser);
app.post('/api/users', db.createUser);

passportConfig(passport);
routerConfig(app, passport);

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
