/* An approach to manage stateless client - server
 * relationships are web tokens. Instead of, for instance,
 * keeping a session on the server side, these tokens
 * contain all the information necessary to access
 * certain ressources. A modern example of such tokens
 * are JSON web tokens.
 */

const express = require("express");
const VERIFY_USER = require("../middleware/verifyUser");

// Setup the router
const router = express.Router();

router.get("/", (req, res) => {
  VERIFY_USER(req, res, (sessiondata) => {
    res.render("home", {
      helpers: {
        name() {
          return sessiondata.userName;
        },

        audBy() {
          return sessiondata.aud;
        },

        expire() {
          let expiresIn = sessiondata.exp;
          let date = new Date(expiresIn * 1000);
          return date;
        },
      },
    });
  });
});

// Configure the router
router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

module.exports = router;
