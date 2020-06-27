const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");

const VERIFY_USER = (req, res, callback) => {
  const token = req.cookies.htaccess;

  if (!token) {
    res.redirect("/login");
  }
  const secret = fs.readFileSync(
    path.join(__dirname, "../store/signature.key")
  );

  jwt.verify(token, secret, (err, payload) => {
    if (!err) callback(payload);
  });
};

module.exports = VERIFY_USER;
