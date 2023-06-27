const mongoose=require('mongoose')
const Decor=require('../admin/Decoration')
const DecorBookSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, // change type to ObjectId
        ref: 'User', 
    },
    DecorId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'DecorSchema', 
    },
    Date: {
        type: String,
    },
    Paid: { type: Boolean, default: false },
},
    {
      timestamps: true, 
    }
);
const DecorBook=mongoose.model("DecorBook",DecorBookSchema)
module.exports=DecorBook;