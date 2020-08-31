const jwt = require("jsonwebtoken");

const VERIFY_USER = (req, res, callback) => {
  const token = req.cookies.htaccess;

  if (!token) {
    res.redirect("/login");
  }


  jwt.verify(token, process.env.SECRET, (err, sessiondata) => {
    if (!err) callback(sessiondata);
    else {
      res.redirect("/login");
    }
  });
};

module.exports = VERIFY_USER;
