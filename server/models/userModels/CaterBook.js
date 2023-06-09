const mongoose = require('mongoose');
const Catering = require('../admin/catering');

const CaterBookSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'userDetails',
  },
  CaterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Catering', // Update to the correct model name 'Catering'
  },
  Date: {
    type: String,
  },
  Paid: { type: Boolean, default: false },
}, 

{
  timestamps: true,
});

const CaterBook = mongoose.model('CaterBook', CaterBookSchema);
module.exports = CaterBook;
