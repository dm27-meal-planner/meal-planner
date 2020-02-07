require('dotenv').config();
const express = require('express');
const app = express();
const session = require('express-session');
const massive = require('massive');

const {SERVER_PORT, SESSION_SECRET, CONNECTION_STRING} = process.env;

// allows use of .json packages
// app.use(express.json());

// user session
app.use(session({
   secret: SESSION_SECRET,
   resave: false,
   saveUninitialized: true,
   cookie: {
      //one week
      maxAge: 1000 * 60 * 60 * 24 * 7
   }
}))

massive(CONNECTION_STRING).then(db => {
   app.set('db', db);
   console.log('Connected to database');
})

app.listen(SERVER_PORT, () => console.log(`Server listening on ${SERVER_PORT}`));