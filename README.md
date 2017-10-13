# OAuth 2.0 Tutorial

##About

In this tutorial, we will build the simplest possible Node/Express web app that lets users log in with their Google accounts and persist their session to the browser. Many tutorials on the topic can be very comprehensive and focused on implenting Oauth with specific technologies for large applications. Not this one. We will have it up and running in 30 minutes, in a form that should be well adaptable to any Node/Express backend.

###Node Modules



CREATE TABLE users (id SERIAL PRIMARY KEY, name VARCHAR(40) NOT NULL, email VARCHAR(40) NOT NULL, avatar VARCHAR(200), googleId VARCHAR(40) NOT NULL, token VARCHAR(200) NOT NULL)
ALTER TABLE users ALTER COLUMN googleId TYPE VARCHAR (100)
DELETE FROM users WHERE email='seanvoreilly2@gmail.com'
