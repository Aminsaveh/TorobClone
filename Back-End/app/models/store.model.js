const mongoose = require("mongoose");
const { ProductSchema } = require("./product.model");
const { ReportSchema } = require("./report.model");
const StoreSchema =  new mongoose.Schema({
  id             : {type : Number},
  ownerId        : {type : Number},
  name           : {type : String},
  city           : {type : String},
  reports        : {type : [String]},
  products       : {type : [String]},
});
const Store = mongoose.model(
  "Store",
  StoreSchema
);
module.exports = {
Store : Store,
StoreSchema : StoreSchema
};