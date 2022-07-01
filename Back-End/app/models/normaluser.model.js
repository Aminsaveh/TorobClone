const mongoose = require("mongoose");
const extendSchema = require('mongoose-extend-schema');
const { ProductSchema } = require("./product.model");
const { UserSchema } = require("./user.model");
const NormalUserSchema = extendSchema(UserSchema,{
    favorites : {type : [ProductSchema]},
    latest : {type : [ProductSchema]},
});

const NormalUser = mongoose.model(
    "NormalUser",
    NormalUserSchema
  );
module.exports = {
    NormalUser : NormalUser,
    NormalUserSchema : NormalUserSchema
  };

