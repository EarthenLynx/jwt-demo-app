const User = require("../models/user");
const randomString = require("crypto-random-string");
const bcrypt = require("bcrypt");

const HANDLE_SIGNUP = (req, res) => {
  // Extract the data from the request's body
  const data = req.body;

  // Create and extract the necessary model data
  const userId = randomString({ length: 40, type: "url-safe" });
  const { userName, userPlaintextPassword, userEmail, userRole } = data;

  // If either of these are missing, send back an error message
  if (!userName || !userPlaintextPassword || !userEmail || !userRole) {
    res.status(400).send({ status: "error", msg: "Please provide all mandatory information" });

    // If all mandatory information are provided, move ahead
  } else {

    // Check if user's email adressalready signed up
    User.findOne({ userEmail }, (err, docs) => {
      
      // If user exists, send back an error message
      if (docs) {
        res.status(400).send({ status: "error", msg: "This email has already been registered, please use another one" });

        // If user doesn't exist, create a new one and save it to the DB
      } else {

        // Encrypt the user's password
        bcrypt.hash(userPlaintextPassword, 10, (err, userPassword) => {
          if (err) throw err;

          // Create new user model and send back a message to the client.
          let user = new User({ userId, userName, userPassword, userEmail, userRole })
          user.save(err => {
            if (err) {
              res.status(500).send({ status: "error", msg: "User could not be created. Please enter all mandatory fields." });
            } else {
              res.status(200).send({ status: "success", msg: "User successfully created" });
            }
          })
        });
      }
    })
  }
};

module.exports = HANDLE_SIGNUP;
