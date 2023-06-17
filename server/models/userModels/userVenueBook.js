const mongoose=require('mongoose')
const Venue=require('../admin/Venue')
const VenueBookSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  VenueId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Venue', // Reference the Venue model instead of 'venueSchema'
  },
  Date: {
    type: String,
  },
}, {
  timestamps: true,
});

const VenueBook = mongoose.model('VenueBook', VenueBookSchema);
module.exports = VenueBook;
