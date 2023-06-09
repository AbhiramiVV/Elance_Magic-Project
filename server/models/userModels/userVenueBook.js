const mongoose=require('mongoose')
const Venue=require('../admin/Venue')
const VenueBookSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'userDetails',
  },
  VenueId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Venue', // Reference the Venue model instead of 'venueSchema'
  },
  Date: {
    type: String,
  },
  Paid: { type: Boolean, default: false },
}, {
  timestamps: true,
});

const VenueBook = mongoose.model('VenueBook', VenueBookSchema);
module.exports = VenueBook;
