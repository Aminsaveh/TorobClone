const mongoose = require("mongoose");
const { StoreSchema } = require("./store.model");
const ProductSchema =  new mongoose.Schema({
  id           : {type : Number},
  name         : {type : String},
  category     : {type : String},
  brand        : {type : String},
  imageUrl     : {type : String},
  details      : {type : Map, of: String},
  stores       : {type : [StoreSchema]}
});
const Product = mongoose.model(
  "Product",
  ProductSchema
);
module.exports = {
Product : Product,
  ProductSchema : ProductSchema
};