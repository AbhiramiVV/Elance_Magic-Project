const mongoose = require('mongoose');

const venueSchema = mongoose.Schema({
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
     menu:{
        type:String,
        required:true
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

const cateringcollection = mongoose.model('Catering', venueSchema); 
module.exports = cateringcollection;
