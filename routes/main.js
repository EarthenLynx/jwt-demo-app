/* An approach to manage stateless client - server
 * relationships are web tokens. Instead of, for instance,
 * keeping a session on the server side, these tokens
 * contain all the information necessary to access
 * certain ressources. A modern example of such tokens
 * are JSON web tokens.
 */

//  Route: /api/

const express = require("express");
const CREATE_TOKEN = require("../controller/createToken");
const HANDLE_SIGNUP = require("../controller/handleSignup");

// Setup the router
const router = express.Router();

// Configure the router
router.post(/*/api*/ "/authenticate", (req, res) => {
  CREATE_TOKEN(req, res);
});

router.post(/*/api*/ "/signup", (req, res) => {
  HANDLE_SIGNUP(req, res);
});

module.exports = router;
