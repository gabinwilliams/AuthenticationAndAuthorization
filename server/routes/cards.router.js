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
// router.get('/getProfiles', (req, res) => {

//   const query = `SELECT movies_genres.id, "movies".id AS movie_id, "movies".title, "movies".poster AS image, "movies".description, "genres".name AS genre FROM "movies_genres"
//   JOIN "movies" ON "movies".id = "movies_genres".movie_id
//   JOIN "genres" ON "genres".id = "movies_genres".genre_id;`;

//   pool.query(query)
//     .then( result => {
//       res.send(result.rows);
//     })
//     .catch(err => {
//       console.log('ERROR: Get all genres', err);
//       res.sendStatus(500)
//     })
// });

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
