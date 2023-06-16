const mongoose=require('mongoose')
const MakeBookSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, // change type to ObjectId
        ref: 'User', 
    },
    MakeId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'MakeSchema', 
    },
    Date: {
        type: String,
    },},
    {
      timestamps: true, 
    }
);
const MakeBook=mongoose.model("MakeBook",MakeBookSchema)
module.exports=MakeBook;