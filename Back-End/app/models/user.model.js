const mongoose = require("mongoose");
const UserSchema =  new mongoose.Schema({
  id           : {type : Number},
  phone        : {type : String},
  name         : {type : String},
  password     : {type : String},
  role         : {type : String}
});
const User = mongoose.model(
  "User",
   UserSchema
);
module.exports = {
  User : User,
  UserSchema : UserSchema
};