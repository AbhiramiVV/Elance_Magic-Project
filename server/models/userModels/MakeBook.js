const mongoose=require('mongoose')
const MakeBookSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
    },
    MakeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:  "MakeupSchema", // Update the ref value to 'Makeup'
    },
    Date: {
        type: String,
    },
}, {
    timestamps: true,
});


const MakeBook = mongoose.model('MakeBook', MakeBookSchema);
module.exports = MakeBook;
