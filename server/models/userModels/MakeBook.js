const mongoose=require('mongoose')
const MakeBookSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userDetails', 
    },
    MakeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:  "MakeupSchema", // Update the ref value to 'Makeup'
    },
    Date: {
        type: String,
    },
    Paid: { type: Boolean, default: false },
}, {
    timestamps: true,
});


const MakeBook = mongoose.model('MakeBook', MakeBookSchema);
module.exports = MakeBook;
