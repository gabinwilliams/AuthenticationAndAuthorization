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

// router.post('/updateTech', (req, res) => {
//   // const username = req.body.username;
//   // const password = encryptLib.encryptPassword(req.body.password);

//   const queryText = `INSERT INTO "user_tech" (user_id, tech_one, tech_two, tech_three)
//     VALUES ($1, $2, $3, $4) `;
//   pool
//     .query(queryText, [req.body.user_id, req.body.tech_one, req.body.tech_two, req.body.tech_three])
//     .then(() => res.sendStatus(201))
//     .catch((err) => {
//       console.log('User registration failed: ', err);
//       res.sendStatus(500);
//     });
// });

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
