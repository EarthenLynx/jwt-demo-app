const jwt = require("jsonwebtoken");
const user = require("../models/user");
const bcrypt = require("bcrypt")

CREATE_TOKEN = (req, res) => {

  // Destructure email and password from request body
  let { userEmail, userPlaintextPassword } = req.body;

  // If either of these are missing, send back an error msg
  if (!userEmail || !userPlaintextPassword) {
    res.status(400).send({ status: "error", msg: "Please type in your password and your username" });

    // If username and password are provided, move ahead
  } else {

    // Execute a query on the db
    user.findOne({ userEmail }, (err, docs) => {

      // If no user is found in the db, send an error msg
      if (!docs) {
        res.status(401).send({
          status: "error",
          msg: "Email adress was not found. A typo, maybe?.",
        });

        // If username is found, move ahead
      } else {
        
        // Compare the password's hash with one another
        bcrypt.compare(userPlaintextPassword, docs.userPassword, (err, result) => {

          // If passwords do not match, send an error msg
          if (!result) {
            res.status(401).send({
              status: "error",
              msg: "The password you've typed in is incorrect. Please retry ..."
            });

            // If passwords do match, create a token
          } else {

            // Restructure the payload
            const { userId, userName, userEmail, userRole } = docs;
            let payload = { userId, userName, userEmail, userRole };


            // Pass in the options
            const options = { expiresIn: "15m", audience: userRole, issuer: "jwt-api" };

            // Create the token and sign it
            const token = jwt.sign(payload, process.env.SECRET, options);

            // Send the token along with a success message
            res.status(200).send({
              status: "success",
              msg: "You've been authenticated and will be redirected in a moment ... ",
              token
            });
          }
        })
      }
    });
  }


};

module.exports = CREATE_TOKEN;