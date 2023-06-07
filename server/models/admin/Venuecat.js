const mongoose=require('mongoose')
const Schema=mongoose.Schema;
const venuecategorySchema=new Schema({
    name:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    }
})
const venueCategory=mongoose.model("venueCategory",venuecategorySchema)
module.exports=venueCategory;