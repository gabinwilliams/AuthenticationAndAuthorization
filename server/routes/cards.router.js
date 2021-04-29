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


  const query = `SELECT * FROM "user";`

  pool.query(query)
    .then( result => {
     
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR: Get all profiles', err);
      res.sendStatus(500)
    })
});



router.get('/likes', (req, res) => {

  const query = `SELECT "user".name, "user".id AS user_id, "user".active, "user".bio, "user".dev_type, "user".github, "user".profile_image, "user".tech_one, "user".tech_two, "user".tech_three, "user".username, "user_likes".liked, "user_likes".liked_user_id, "user_likes".match

  FROM "user_likes"
  JOIN "user" ON "user".id = "user_likes".user_id;`;


  pool.query(query)
    .then( result => {
     
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
router.put('/match', (req, res) => {
  // POST route code here
  // const queryText = `UPDATE "user" 
  // SET "name" = $1, dev_type = $2, profile_image = $3, bio = $4, github = $5, tech_one = $6, tech_two = $7, tech_three = $8, active = $9
  // WHERE "user".id = ${req.body.id}

  console.log('In POST /match', req.body);
  const queryText = `UPDATE "user_likes" 
    SET "match" = $1
    WHERE "user_id" = ${req.body.user_id} AND "liked_user_id" = ${req.body.liked_user_id}
    ;`;
  pool
    .query(queryText, [req.body.match])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('error in PUT /match ', err);
      res.sendStatus(500);
    });
});


router.delete('/connection/request/:id', (req, res) => {
 

  console.log('In DELETE /connection/request', req.params);
  const queryText = `
  DELETE FROM "user_likes" 
  WHERE "user_likes".user_id = ${req.params.id}
  `;
  pool
    .query(queryText)
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('error in DELETE /connection/request ', err);
      res.sendStatus(500);
    });
});


module.exports = router;
