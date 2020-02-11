const bcrypt = require('bcryptjs');

const getUser = async (req, res) => {
   if(!req.session.user){
      res.status(400).json('User is currently not logged in')
   } else {
      res.status(200).json(req.session.user);
   }
}

const registerUser = async (req, res) => {
   const db = req.app.get('db');
   const {username, password, email, first_name, last_name, household_size} = req.body;
   const dupeUserName = await db.check_for_username(username);
   const dupeEmail = await db.check_for_email(email);
   if (dupeUserName[0] || dupeEmail[0]) {
      res.status(409).json('Username and/or email already exists.')
   } else {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);
      const newUser = await db.register_user(username, hash, email, first_name, last_name, household_size);
      req.session.user = {
         user_id: newUser[0].user_id,
         username: newUser[0].username,
         email: newUser[0].email,
         household_size: newUser[0].household_size
      }
   }
   res.status(201).json(req.session.user);
}

const loginUser = async (req, res) => {
   const db = req.app.get('db');
   const {username, password} = req.body;
   const userid = await db.check_for_username(username);
   //a salt/hash is not necessary due to the compareSync function of bcrypt;
   //it checks if the password inputted is the same as the hash of the one found.
   //if it cannot find via username, try to find via email instead
   if (!userid[0]) {
      userid = await db.check_for_email(username);
   }
   if (userid[0]) {
      const checkPass = bcrypt.compareSync(password, userid[0].password)
      if (checkPass) {
         req.session.user = {
            user_id: userid[0].user_id,
            username: userid[0].username,
            email: userid[0].email,
            household_size: userid[0].household_size,
            uid: newUser[0].uid
         }
         res.status(200).json(req.session.user);
      } else {
         res.status(401).json('Invalid credentials.');
      }
   } else {
      res.status(401).json('Invalid credentials.');
   }
}

const logoutUser = (req, res) => {
   req.session.destroy();
   res.sendStatus(200);
}

const registerFirebase = async (req, res) => {
   const {username, email, household_size, uid} = req.body;
   const db = req.app.get('db')
   const newUser = await db.register_firebaseuser(username, email, household_size, uid);
   req.session.user = {
      user_id: newUser[0].user_id,
      username: newUser[0].username,
      email: newUser[0].email,
      household_size: newUser[0].household_size
   }
   res.status(201).json(req.session.user);
}

const loginFirebase = async (req, res) => {
   const db = req.app.get('db')
   const user = await db.login_firebaseuser(req.body.uid);
   req.session.user = {
      user_id: user[0].user_id,
      username: user[0].username,
      email: user[0].email,
      household_size: user[0].household_size
   }
   res.status(200).json(req.session.user);
}

module.exports = {
   getUser,
   registerUser,
   loginUser,
   logoutUser,
   registerFirebase,
   loginFirebase
}