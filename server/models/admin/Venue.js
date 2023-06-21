const mongoose = require('mongoose');

const venueSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
 
  description: {
    type: String,
    required: true,
  },
  manager: {
    type: String,
    required: true,
  },
  address: {
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
  sevices: {
    type: String,
    required: true,
  },
  seats: {
    type: String,
    required: true,
  },
  rent: {
    type: String,
    required: true,
  },
  image: {
    type: Object,
    required:true,
  },
});

const venuecollection = mongoose.model('Venue', venueSchema); // Updated collection name to 'Venue'
module.exports = venuecollection;
