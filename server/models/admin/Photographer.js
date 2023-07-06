const mongoose=require('mongoose')
const photographerSchema=mongoose.Schema({
    VendorId:{
        type: String,
     
      },

    pname:{
        type:String,
        required:true
    },
    pdesc:{
        type:String,
        required:true
    },
pemail:{
    type:String,
    required:true

},
pmobile:{
type:String,
required:true
},
paddress:{
    type:String,
    required:true
},
pexperiance:{
    type:String,
    required:true
},
rate:{
    type:String,
    required:true
},
date:{
type:Date,
},
image: {
  type:Array,
  required:true
}

})
const photographer=mongoose.model("photographerSchema",photographerSchema)
module.exports=photographer
