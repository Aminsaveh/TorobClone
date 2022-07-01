const mongoose = require("mongoose");
const { ProductStore } = require("./productstore.model");
const ProductSchema =  new mongoose.Schema({
  id           : {type : Number},
  price        : {type : Number},
  name         : {type : String},
  category     : {type : String},
  brand        : {type : String},
  imageUrl     : {type : String},
  details      : {type : Map, of: String},
  stores       : {type : [ProductStore]}
});
const Product = mongoose.model(
  "Product",
  ProductSchema
);
module.exports = {
Product : Product,
  ProductSchema : ProductSchema
};