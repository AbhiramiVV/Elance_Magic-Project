
const superadmin = require("../models/admin/superadmin");
const mailer = require("../config/otp");
const upload = require("../utility/multer");
const Eventcat = require("../models/admin/Eventcategory");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User=require('../models/userModels/userDetails');
const randomNum = require("../randomNum");
const AdminSchema=require('../models/admin/AdminSchema');
const CaterBook=require("../models/userModels/CaterBook")
const userModels=require("../models/userModels/userDetails")



const createToken = (_id) => {
  return jwt.sign({_id},'superadminSecretkey',{expiresIn:'3d'})
}
module.exports = {

login :async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body,'+++++++++++++++');

    const superwe = await superadmin.findOne({ email: req.body.email });
    console.log(superwe);

    if (email === superwe.email && password === superwe.password) {
      const token = createToken(superwe._id);
      console.log("Token created: " + token);
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

insertAdmin :async (req, res) => {
  try {
    const {email}=req.body;
    const existingAdmin = await AdminSchema.findOne({ email: req.body.email });
    if (existingAdmin) {
      return res.status(200).json({ error: "Email is already registered" });
    }
    let otp=randomNum.randomNumber();
mailer.sentMail(email,otp);
    const newAdmin = new Admin({
      email: req.body.email,
      companyname: req.body.companyName,
      description: req.body.description,
      category: req.body.selectedService,
      place: req.body.selectedPlace,
      mobile: req.body.phone,
      verified: true,
      approved: false,
    });

    await newAdmin.save();
    res.status(200).json({ message: "Admin details added" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}
,

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
    console.log(result,'8888888888888');
    res.status(201).json({data:result});
  } catch (error) {
    res.status(500).json(error);
  }
},

 
getAdmin:async(req,res)=>{
 countuser=await User.find({}).count()
 console.log(countuser)



},
}
