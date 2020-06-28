const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");

const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("store/users.json");
const db = low(adapter);

CREATE_TOKEN = (req, res) => {
  const data = req.body;

  const { user, password } = data;

  const auth = user + ":" + password;
  const auth64 = Buffer.from(auth, "utf-8").toString("hex");

  const exists = db.get("users").find({ auth: auth64 }).value();

  if (exists) {
    const payload = { user };

    const options = {
      expiresIn: "5m",
      audience: exists.role,
      issuer: "My API",
    };

    const secret = fs.readFileSync(
      path.join(__dirname, "../store/signature.key")
    );

    const token = jwt.sign(payload, secret, options);

    res
      .status(200)
      .send({ status: "success", msg: "You've been authenticated", token });
  } else {
    res.status(401).send({
      status: "error",
      msg:
        "User - PW combination not found. Sign up first. " +
        auth +
        user +
        password +
        auth64 +
        exists,
    });
  }
};

module.exports = CREATE_TOKEN;

// const secret = req.headers.secret;
//   if (!secret) res.status(500).send({ status: "error", msg: "Bad request" });

//   // Prepare a payload and an issuer
//   const payload = { name: "Marco", lief: 28391 };
//   const issuer = "https://www.hettich.com";

//   const options = { issuer };
//   console.log(secret);

//   // Sign the token with the given secret, e.g. an encrypted hash of the user/password
//   const token = jwt.sign(payload, secret, options);
//   const verify = jwt.verify(token, secret);
//   console.log(token);

//   res.send({ token, verify });
