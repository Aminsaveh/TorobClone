const mongoose = require("mongoose");
const ReportSchema =  new mongoose.Schema({
  id               : {type : Number},
  userId           : {type : Number},
  productId        : {type : Number},
  kind             : {type : String}
});
const Report = mongoose.model(
  "Report",
  ReportSchema
);
module.exports = {
Report : Report,
ReportSchema : ReportSchema
};