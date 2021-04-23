const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const userStrategy = require('../strategies/user.strategy');

/**
 * GET route template
//  */
router.get('/', (req, res) => {

  // const query = `SELECT "user".name, "user".id AS user_id, "user".active, "user".bio, "user".dev_type, "user".github, "user".profile_image, "user".tech_one, "user".tech_two, "user".tech_three, "user".username, "user_likes".liked, "user_likes".liked_user_id, "user_likes".match
  // FROM "user_likes"
  // JOIN "user" ON "user".id = "user_likes".user_id;`;

  const query = `SELECT * FROM "user";`

  pool.query(query)
    .then( result => {
      console.log('object to send:', result.rows);
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR: Get all profiles', err);
      res.sendStatus(500)
    })
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
