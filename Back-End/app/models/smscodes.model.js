const mongoose = require("mongoose");
const SmsSchema =  new mongoose.Schema({
  userEmail           : {type : String},
  id                  : {type : String}
});
const Sms = mongoose.model(
  "Sms",
  SmsSchema
);
module.exports = {
   Sms : Sms,
  SmsSchema : SmsSchema
};