const mongoose = require("mongoose");
const MakeupSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  manager: {
    type: String,
    required: true,
  },
 type:{
  type:String,
  required:true,
 },
  desc: {
    type: String,
    required: true,
  },
  address:{
    type:String,
    required:true
},
  email: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  rent: {
    type: String,
    required: true,
  },
  image: {
    type: Array,
  },
});
const Makeupcollection = mongoose.model("MakeupSchema", MakeupSchema);
module.exports = Makeupcollection;
