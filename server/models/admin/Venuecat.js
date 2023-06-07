const mongoose=require('mongoose')
const venuecategorySchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    image:{
        type:Object,
        required:true
    }
})
const venueCategory=mongoose.model("venueCategory",venuecategorySchema);
module.exports=venueCategory;