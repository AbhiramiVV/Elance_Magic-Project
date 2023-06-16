const mongoose=require('mongoose')
const CaterBookSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, // change type to ObjectId
        ref: 'User', 
    },
    CaterId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'CaterSchema', 
    },
    Date: {
        type: String,
    },},
    {
      timestamps: true, 
    }
);
const CaterBook=mongoose.model("CaterBook",CaterBookSchema)
module.exports=CaterBook;