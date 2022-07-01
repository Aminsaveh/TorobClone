const mongoose = require("mongoose");
const ProductStoreSchema =  new mongoose.Schema({
  price           : {type : Number},
  storeId         : {type : Number},
});
const ProductStore = mongoose.model(
  "ProductStore",
  ProductStoreSchema
);
module.exports = {
    ProductStore : ProductStore,
ProductStoreSchema : ProductStoreSchema
};