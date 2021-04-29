const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const userStrategy = require('../strategies/user.strategy');

const pool = require('../modules/pool');
const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);

  const queryText = `INSERT INTO "user" (username, password)
    VALUES ($1, $2) RETURNING id`;
  pool
    .query(queryText, [username, password])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('User registration failed: ', err);
      res.sendStatus(500);
    });
});

router.post('/registerInfo', (req, res) => {
  // const username = req.body.username;
  // const password = encryptLib.encryptPassword(req.body.password);

  const queryText = `UPDATE "user" 
  SET "name" = $1, dev_type = $2, profile_image = $3, bio = $4, github = $5, tech_one = $6, tech_two = $7, tech_three = $8, active = $9
  WHERE "user".id = ${req.body.id}
    `;
  pool
    .query(queryText, [req.body.name, req.body.dev_type, req.body.profile_image, req.body.bio, req.body.github, req.body.tech_one, req.body.tech_two, req.body.tech_three, req.body.active])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('User registration failed: ', err);
      res.sendStatus(500);
    });
});

router.post('/updateLikes', (req, res) => {
  // const username = req.body.username;
  // const password = encryptLib.encryptPassword(req.body.password);

  console.log('In POST /updateLikes', req.body);
  const queryText = `INSERT INTO "user_likes" (user_id, liked, liked_user_id)
    VALUES ($1, $2, $3) `;
  pool
    .query(queryText, [req.body.user_id, req.body.liked, req.body.liked_user_id])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('error in POST updateLikes ', err);
      res.sendStatus(500);
    });
});


router.post('/chat', (req, res) => {
  // const username = req.body.username;
  // const password = encryptLib.encryptPassword(req.body.password);

  console.log('In POST /chat', req.body);
  const queryText = `INSERT INTO "messages" (user_id, liked_user_id, message, match)
    VALUES ($1, $2, $3, $4) `;
  pool
    .query(queryText, [req.body.user_id, req.body.liked_user_id, req.body.message, req.body.match])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('error in POST chat ', err);
      res.sendStatus(500);
    });
});



router.post('/current/chat', (req, res) => {
  // const username = req.body.username;
  // const password = encryptLib.encryptPassword(req.body.password);

  console.log('In POST /current/chat', req.body);
  const queryText = `UPDATE "current_chat" 
  SET "user_id" = $1, "liked_user_id" = $2, "name" = $3, "profile_image" = $4, "match" = $5
  WHERE "current_chat".id = 1;
  `;
  pool
    .query(queryText, [req.body.user_id, req.body.liked_user_id, req.body.name, req.body.profile_image, req.body.match])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('error in POST current_chat ', err);
      res.sendStatus(500);
    });
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

module.exports = router;
