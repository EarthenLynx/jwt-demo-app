const mongoose = require("mongoose");
const Schema = mongoose.Schema; 

const UserSchema = new Schema({
  userId: {type: String, required: true}, 
  userName: {type: String, required: true}, 
  userPassword: {type: String, required: true},
  userEmail: {type: String, required: true}, 
  userRole: {type: String, required: true}
})

module.exports = mongoose.model("User", UserSchema);