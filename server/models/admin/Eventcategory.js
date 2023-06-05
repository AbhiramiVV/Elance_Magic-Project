const mongoose=require('mongoose')
const Schema=mongoose.Schema;
const eventcategorySchema=new Schema({
    name:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    }
})
const eventCategory=mongoose.model("eventCategory",eventcategorySchema)
module.exports=eventCategory;