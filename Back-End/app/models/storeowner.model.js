const mongoose = require("mongoose");
const extendSchema = require('mongoose-extend-schema');
const { StoreSchema } = require("./store.model");
const { UserSchema } = require("./user.model");

const StoreOwnerSchema = extendSchema(UserSchema,{
    stores    : {type : [StoreSchema]}
});

const StoreOwner = mongoose.model(
    "StoreOwner",
    StoreOwnerSchema
  );
module.exports = {
    StoreOwner : StoreOwner,
    StoreOwnerSchema : StoreOwnerSchema
  };