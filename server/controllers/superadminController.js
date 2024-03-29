
const superadmin = require("../models/admin/superadmin");
const mailer = require("../config/otp");
const upload = require("../utility/multer");
const Eventcat = require("../models/admin/Eventcategory");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User=require('../models/userModels/userDetails');
const randomNum = require("../randomNum");
const AdminSchema=require('../models/admin/AdminSchema');
const userModels=require("../models/userModels/userDetails")
const venuecollection = require("../models/admin/Venue");
const Decorcollection = require("../models/admin/Decoration");
const photographer = require("../models/admin/Photographer");
const cateringcollection = require("../models/admin/catering");
const Makeupcollection = require("../models/admin/makeupSchema");
const PhotoBook=require("../models/userModels/PhotoBook");
const MakeBook=require("../models/userModels/MakeBook");
const VenueBook=require("../models/userModels/userVenueBook")
const DecorBook=require("../models/userModels/DecorBook")
const Venue=require("../models/admin/Venue");
const adminModels = require("../models/admin/AdminSchema");
const CaterBook= require("../models/userModels/CaterBook")

const createToken = (_id) => {
  return jwt.sign({_id},'superadminSecretkey',{expiresIn:'3d'})
}
module.exports = {

login :async (req, res) => {
  try {
    const { email, password } = req.body;
    const superwe = await superadmin.findOne({ email: req.body.email });
    if (superwe) {
      id = superwe._id;

      const checkpassword = await bcrypt.compare(
        password,
        superwe.password
      );
    if (email === superwe.email && checkpassword) {
      const token = createToken(superwe._id);
      return res.status(200).json({ token, message: "Login successful" });
    } else {
      return res.status(200).json({  success: true,error: "Incorrect login details" });
    }
  }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
},

customerview :async (req, res) => {
  try {
    const alluser = await userModels.find();
    res.status(201).json({ data: alluser });
  } catch (error) {
    res.status(404).json({ message: "error occured" });
  }
},
blockUser :async (req, res) => {
  try {
    const id = req.params.id;
    const userStatus = await userModels.findById(id);

    if (userStatus.isBlocked === false) {
      const isBlocked = await userModels.findByIdAndUpdate(id, { isBlocked: true });
     
      res.json({ success: true ,message:"User Blocked succesfully"});
    } else {
      const isBlocked = await userModels.findByIdAndUpdate(id, { isBlocked: false });
      res.json({ success: true ,message:"user UnBlocked succesfully"});
    }
  } catch (error) {
    console.error('Error blocking/unblocking user:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
},
 viewadmin :async (req, res) => {
  try {
    const viewdata = await AdminSchema.find();
    res.json({ data: viewdata});
  } catch (error) {}
},

singleviewadmin :async (req, res) => {
  try {
    const { id } = req.params;
    const userindividual = await AdminSchema.findById({ _id: id });
    res.status(201).json(userindividual);
  } catch (error) {
    console.log("error");
  }
},
 updateadmin :async (req, res) => {
  try {
    const admin = await AdminSchema.findByIdAndUpdate(req.params.id, req.body, req.file,{
      new: true,
    });
    if (!admin) {
      return res.status(404).json({ message: "admin not found" });
    }
    res.json({ data: admin });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
},
blockAdmin:async (req, res) => {

  const id=req.params.id
  const adminstatus=await AdminSchema.findById(id);
  if (adminstatus.isBlocked===false){
  const isBlocked=await AdminSchema.findByIdAndUpdate(id,{isBlocked:true})
  res.json({success:true,message:"Admin blocked successfully"})
  }else{
    const isBlocked = await AdminSchema.findByIdAndUpdate(id,{isBlocked:false})
    res.json({success:false,message:"Admin unblocked successfully"})
  }
  
  },

Order: async (req, res) => {
  try {
    const photo= await PhotoBook.find({ Paid: true })
    .populate('userId', 'name ') 
    .populate('PhotoId', 'pname rate');
  
    const venue= await VenueBook.find({Paid:true}).populate("userId","name")
    .populate("VenueId","name rent");
    const cater= await CaterBook.find({Paid:true}).populate("userId","name")
    .populate("CaterId","name rent");
    const make= await MakeBook.find({Paid:true}).populate("userId","name")
    .populate("MakeId","name rent");
    const decor= await DecorBook.find({Paid:true}).populate("userId","name")
    .populate("DecorId","name rent");
   
    res.status(200).json({ photo,venue,cater,make,decor});
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(404).json({ error: "Internal Server Error" });
  }
},
  approved:async(req,res)=>{
    const id=req.params.id

  const admin=  await AdminSchema.findByIdAndUpdate({_id:id},{$set:{applicationStatus:"approved"}})
      mailer.approvedMail(admin.email,admin.companyname);
      res.json({err:false,message:"admin is approved"})
  },
  reject:async(req,res)=>{

    const id=req.params.id

  const admin=  await AdminSchema.findByIdAndUpdate({_id:id},{$set:{applicationStatus:"Rejected"}})
      mailer.approvedMail(admin.email,admin.companyname);
      res.json({err:false,message:"admin is rejected"})
    
  },
  
transactions : async (req, res) => {
  try {
    const result = await CaterBook.find({ Paid: true }).populate('CaterId','VendorId')
    
    res.status(201).json({data:result});
  } catch (error) {
    res.status(500).json(error);
  }
},

 
getAdmin:async(req,res)=>{
  const countuser=await User.find({}).count()
 
  const venuecount=await Venue.find({}).count()
  const venue=await Venue.find()
 const photocount=await photographer.find({}).count()
 const catercount=await cateringcollection.find({}).count()
 const cater=await cateringcollection.find()
 const Decorcount=await Decorcollection.find({}).count()
 const admin=await adminModels.find().count()
 const decor=await Decorcollection.find()
 const user=await User.find()
 const photo = await photographer.find();
 const makecount=await Makeupcollection.find({}).count()
 const make=await Makeupcollection.find()
 let photoBookings = 0;
  await PhotoBook.find().populate('PhotoId','rate').then(datas => datas.map(data=>{
   photoBookings =parseInt( data.PhotoId.rate)+photoBookings
 }))

 let DecorBookings=0;
 await DecorBook.find().populate('DecorId','rent').then(datas=>datas.forEach(data=>{
  if(data.DecorId && data.DecorId.rent){
    DecorBookings=parseInt(data.DecorId.rent)+DecorBookings
  }
 }))

  let VenueBookings=0;
   await VenueBook.find().populate('VenueId','rent').then(datas=>datas.forEach(data=>{
    if(data.VenueId && data.VenueId.rent){
      VenueBookings=parseInt(data.VenueId.rent)+VenueBookings

    }
   }))
   let MakeBookings=0;
   await MakeBook.find().populate('MakeId','rent').then(datas=>datas.forEach(data=>{
    if(data.MakeId && data.MakeId.rent){
      MakeBookings=parseInt(data.MakeId.rent)+MakeBookings
    }
   }))

   let CaterBookings = 0;
   await CaterBook.find().populate('CaterId', 'rent').then(datas => {
     datas.forEach(data => {
       if (data.CaterId && data.CaterId.rent) {
         CaterBookings += parseInt(data.CaterId.rent);
       }
     }); 
   });
   const photoOrder = await PhotoBook.find({ Paid: true }).count();
   const venueOrder= await VenueBook.find({Paid:true}).count();
   const caterOrder= await CaterBook.find({Paid:true}).count();
   const makeOrder= await MakeBook.find({Paid:true}).count();
   const decorOrder= await DecorBook.find({Paid:true}).count()
   const Orders=photoOrder+venueOrder+caterOrder+makeOrder+decorOrder
  
 const TotalRevenue=VenueBookings+photoBookings+CaterBookings+MakeBookings+DecorBookings 
 res.status(200).json({Orders,venuecount,countuser,photocount,Decorcount,catercount,makecount,venue,decor,photo,admin,user,cater,make,DecorBookings,photoBookings,VenueBookings,TotalRevenue,MakeBookings,CaterBookings})
 },
 superadminAuthe:async(req,res)=>{


  const {authorization} =req.headers
 if(!authorization){
     return res.status(401).json({error: "Authorization token required"})
 }
 
 const token = authorization 
 
 try {
  const {_id} = jwt.verify(token,"superadminSecretkey")
  const response=await superadmin.find({_id})
  res.status(200).json({
      token,
    });
     
 } catch (error) {
     console.log(error);
     res.status(401).json({error:"Request is not authorized"})
 
 }


},



}
