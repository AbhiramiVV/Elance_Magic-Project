
 

const mongoose=require('mongoose')

const adminSchema=mongoose.Schema({
    email: { type: String, unique: true, required: true, trim: true },
    companyname: { type: String, required: true },
    description: { type: String, required: true, trim: true },
    category: { type: Array, required: true, trim: true },
    place: { type: Array, required: true, trim: true },
    mobile: { type: Number, unique: true, trim: true, required: true },
    verified: { type: Boolean },
    applicationStatus: { type: String ,default:"applied"},
    password: { type: String, trim: true, required: true },
    isBlocked:{
        type:Boolean,
        default:false
    },
    certificate: { type: Object, required: true, trim: true },
    coverPhoto: { type: String, trim: true },
    profilePhoto: { type: String, trim: true },
    gallery: { type: Array, default: [], required: true, trim: true },
        
})

const adminModels=mongoose.model('adminDetails',adminSchema);
module.exports=adminModels;

