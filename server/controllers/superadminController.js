
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
    if (email === superwe.email && password === superwe.password) {
      const token = createToken(superwe._id);
      return res.status(200).json({ token, message: "Login successful" });
    } else {
      return res.status(200).json({  success: true,error: "Incorrect login details" });
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
    console.log(id);
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
    console.log(userindividual);
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
console.log(adminstatus);
  if (adminstatus.isBlocked===false){
  const isBlocked=await AdminSchema.findByIdAndUpdate(id,{isBlocked:true})
  res.json({success:true,message:"Admin blocked successfully"})
  }else{
    const isBlocked = await AdminSchema.findByIdAndUpdate(id,{isBlocked:false})
    res.json({success:false,message:"Admin unblocked successfully"})
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
    const result = await CaterBook.find({ Paid: true })
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
 await DecorBook.find().populate('DecorId','rent').then(datas=>datas.map(data=>{
   DecorBookings=parseInt(data.DecorId.rent)+DecorBookings
 }))
  let VenueBookings=0;
   await VenueBook.find().populate('VenueId','rent').then(datas=>datas.map(data=>{
     VenueBookings=parseInt(data.VenueId.rent)+VenueBookings
   }))
   let MakeBookings=0;
   await MakeBook.find().populate('MakeId','rent').then(datas=>datas.map(data=>{
    MakeBookings=parseInt(data.MakeId.rent)+MakeBookings
   }))
   let CaterBookings = 0;
   await CaterBook.find().populate('CaterId', 'rent').then(datas => {
     datas.forEach(data => {
       if (data.CaterId && data.CaterId.rent) {
         CaterBookings += parseInt(data.CaterId.rent);
       }
     });
   });
 
 const TotalRevenue=VenueBookings+DecorBookings+photoBookings+MakeBookings
 
 res.status(200).json({venuecount,countuser,photocount,Decorcount,catercount,makecount,venue,decor,photo,admin,user,cater,make,CaterBookings,DecorBookings,photoBookings,VenueBookings,MakeBookings,TotalRevenue})
 }



}
