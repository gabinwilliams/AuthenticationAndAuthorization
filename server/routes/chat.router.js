const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const encryptLib = require("../modules/encryption");
const userStrategy = require("../strategies/user.strategy");

router.get("/messages", (req, res) => {
  const query = `SELECT * FROM "messages";`;
  pool
    .query(query)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("ERROR: Get all profiles", err);
      res.sendStatus(500);
    });
});

router.get("/currentChat", (req, res) => {
  const query = `SELECT * FROM "current_chat";`;

  pool
    .query(query)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("ERROR: Get currentChat", err);
      res.sendStatus(500);
    });
});

module.exports = router;
