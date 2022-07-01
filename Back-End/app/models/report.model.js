const mongoose = require("mongoose");
const ReportSchema =  new mongoose.Schema({
  userId           : {type : Number},
  productId        : {type : Number},
  kind             : {type : String, enum : ["InCorrectDetails","InCorrectPrice"]}
});
const Report = mongoose.model(
  "Report",
  ReportSchema
);
module.exports = {
Report : Report,
ReportSchema : ReportSchema
};