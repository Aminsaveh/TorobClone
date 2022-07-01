const mongoose = require("mongoose");
const CountersSchema =  new mongoose.Schema({
  id    : {type : String},
  seq   : {type : Number}
});
const Counters = mongoose.model(
    "Counters",
    CountersSchema
);
module.exports = {
    Counters : Counters,
    CountersSchema : CountersSchema
};