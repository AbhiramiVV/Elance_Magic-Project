const mongoose=require('mongoose')

const Schema=mongoose.Schema;
const superadminSchema=new Schema({
   
    email:{
        type:String,
        required:true,

    },
    
    password:{
        type:String,
        required:true
    },
    

});

const Superadmin=mongoose.model("superadmin",superadminSchema);
module.exports=Superadmin;



