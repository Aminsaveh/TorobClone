const mongoose = require("mongoose");
const ReportSchema =  new mongoose.Schema({
  id            : {type : Number},
  userId        : {type : Number},
  content       : {type : String},
  type          : {type : String, enum : ["InCorrectDetails","InCorrectPrice"]}
});
const Report = mongoose.model(
  "Report",
  ReportSchema
);
module.exports = {
Report : Report,
ReportSchema : ReportSchema
};