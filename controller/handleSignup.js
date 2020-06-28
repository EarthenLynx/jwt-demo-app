const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("store/users.json");
const db = low(adapter);

HANDLE_SIGNUP = (req, res) => {
  const data = req.body;

  const { user, password, role } = data;

  const auth = user + ":" + password;
  const auth64 = Buffer.from(auth, "utf-8").toString("hex");

  const num = db.get("users").size().value() + 1;
  if (num > 25) {
    db.get("users").shift().write();
  }
  const exists = db.get("users").find({ auth: auth64 }).value();

  if (exists) {
    res
      .status(500)
      .send({ status: "error", msg: "User already exists" + exists });
  } else {
    db.get("users").push({ num: num, auth: auth64, role: role }).write();
    res.status(200).send({
      status: "success",
      msg: "User has been created. You can now login",
    });
  }
};

module.exports = HANDLE_SIGNUP;
