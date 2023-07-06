const mongoose = require("mongoose");
const DecorSchema = mongoose.Schema({
  VendorId:{
    type: String,
 
  },
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
const Decorcollection = mongoose.model("DecorSchema", DecorSchema);
module.exports = Decorcollection;
