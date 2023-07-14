const jwt = require("jsonwebtoken");
const twilio = require("../utility/twilio");
const upload=require("../utility/multer")
const bcrypt = require("bcrypt");
const mailer = require("../config/otp");
const { randomNumber } = require("../randomNum");
const adminModels = require("../models/admin/AdminSchema");
const userModels = require("../models/userModels/userDetails");
const venueCategory =require("../models/admin/Venuecat")
const Venue=require("../models/admin/Venue")
const { sentMail } = require("../config/otp");
const { response } = require("express");
const venuecollection = require("../models/admin/Venue");
const Decorcollection = require("../models/admin/Decoration");
const photographer = require("../models/admin/Photographer");
const cateringcollection = require("../models/admin/catering");
const Makeupcollection = require("../models/admin/makeupSchema");
const PhotoBook=require("../models/userModels/PhotoBook");
const CaterBook=require("../models/userModels/CaterBook");
const MakeBook=require("../models/userModels/MakeBook");
const VenueBook=require("../models/userModels/userVenueBook")
const DecorBook=require("../models/userModels/DecorBook");
const { ChatModel } = require("../models/chatModel");
const createToken = (_id) => {
  return jwt.sign({ _id }, "adminsecretkey", { expiresIn: "3d" });
};

module.exports = {
login: async (req, res) => {

    try {
      const { email, password } = req.body;

      const adminExist = await adminModels.findOne({ email: email });
       

      if (adminExist) {

        const passwordMatch = await bcrypt.compare(
          password,
          adminExist.password
        );

        if (passwordMatch) {
          const token = createToken(adminExist._id);
          res.status(200).json({
            token,
            create: true,
            adminExist,
          });
        } else {
          res.status(401).json({ error: "Incorrect login details" });
        }
      } else {
        res.status(401).json({ error: "Incorrect login details" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  },
  postSignup: async (req, res) => {
    try {
      
      const {companyName,description,phone,email,password,selectedPlace,personName,certificate} =req.body
    
      const vendorExist = await adminModels.findOne({ email: email});
      if (vendorExist) {
        return res.status(200).json({
          message: "Already registered using this mobile number",
          state: false,
        });
      } else {
        let otp = randomNumber();
        console.log(otp);
        //twilio.sendVerificationToken(phone, otp);
          mailer.sentMail(email,otp);
        const signupToken=jwt.sign({                  
          otp:otp,

      },
      "00f3f20c9fc43a29d4c9b6b3c2a3e18918f0b23a379c152b577ceda3256f3ffa");
      let bcrypPassword=await bcrypt.hash(password,10)
        const newAdmin = new adminModels({
          email:  email,
          companyname:  companyName,      
          description:  description,
          category: personName,
          place: selectedPlace,
          mobile:phone,

          verified: false,
          approved: false,
          password:   bcrypPassword,
          certificate: req.file,
      
        });

        await newAdmin.save();

        return res
          .cookie("signupToken", signupToken, {
            httpOnly: true,
            secure: true,
            maxAge: 1000 * 60 * 60 * 24 * 7,
            sameSite: "none",
          })
          .json({ err: false, message: "OTP sent successfully" });
      }
    } catch (error) {
      console.log("error", error);
      return res.status(500).json({ err: true, message: "Internal server error" });
    }
  },
  verifyvendorSignup:async(req,res)=>{
    
    const {email,
      companyname,
      description,
      category,
      place,
      phone,
    
      password,
      }=req.body
      
   
    let otp=req.body.OTP;
    let userToken=req.cookies.signupToken;
     const OtpToken = jwt.verify(userToken,'00f3f20c9fc43a29d4c9b6b3c2a3e18918f0b23a379c152b577ceda3256f3ffa')
    if(otp==OtpToken.otp){

     let user= await adminModels.updateOne({email:email},{$set:{verified:true}})
        const vendorToken=jwt.sign({
            id:user._id
        },
        "00f3f20c9fc43a29d4c9b6b3c2a3e18918f0b23a379c152b577ceda3256f3ffa");
        return res.cookie("userToken", vendorToken, {
            httpOnly: true,
            secure: true,
            maxAge: 1000 * 60 * 60 * 24 * 7,
            sameSite: "none",
        }).json({ err: false ,message:'vendor registration success'});
    }else{
        res.json({err:true,message:'something went wrong'})
    }

},




providerDetails :async (req, res) => {

  try {
    const id=req.params.id;
    const provider = await adminModels.findOne({ _id: id});
    res.status(200).json({ data: provider });
  } catch (error) {
    res.status(500).json({ message: error });
  }
},
removeService:async(req,res)=>{
  const { data,name } = req.body;
  {
    
    try {
      await adminModels.updateOne({ _id:data._id},{ $pull: { category:name} }).then((response)=>{
      })
      res.status(201).json({ message: "success" })
    } catch (error) {
      res.status(500).json({ message: error })
    }
}
},
addService :async (req, res) => {
  const { data} = req.body;
  const id=req.params.id;
  {
    try {
      await adminModels.updateOne({ _id:id}, { $push: { category: data} }).then((response)=>{
      })
      res.status(201).json({ message: "success" })
    } catch (error) {
      res.status(500).json({ message: error })
    }
}
},
editProfileGet:async (req, res) => {
  const id=req.params.id;
  try {
    const profile = await adminModels.findOne({ _id:id });
    profile ?
      res.status(201).json({ profile }) :
      res.status(500).json({ message: "error" })
  } catch (error) {
    res.status(500).json({ message: "error" })
  }

},
editProfilePatch: async (req, res) => {
  const {  name, description, place } = req.body;
  let email=req.body.email.adminExist.email
  try {
   await adminModels.updateMany({email:email},{$set:{companyname:name,description:description,place:place}})
    res.status(201).json({ message: "success" });
  } catch (error) {
    res.status(500).json({ message: "Failed to update profile", error });
  }
},
 Venuecategory :async (req, res) => {
  try {
    const venue = await venueCategory.find();
    res.status(201).json({ data: venue });
  } catch (error) {}
},
addVenue : async (req, res) => {
  
  const allvenue = await venueCategory.find();
  const verify = await venueCategory.findOne({
    name: { $regex: new RegExp(req.body.name, "i") },
  });
  if (verify) {
    res.status(201).json({ err: "category already exist" });
  } else {
    const newVenuecat = new venueCategory({
      name: req.body.name,
      image: req.file,
    });
    await newVenuecat.save();
    res.status(201).json({ message: "successfully added", verified: true });
  }
},
Deletecat:async (req, res) => {
  const id = req.params.id;
  try {
    await venueCategory.findByIdAndDelete(id);
    res.status(200).json({ message: "Venue category deleted successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json();
  }

},
venuecollectview :async (req, res) => {
  try {
    const allvenue = await venuecollection.find();
 
    res.status(200).json({ data: allvenue, verified: true });
  } catch (error) {
    res.status(401).json({ err: "nothing to display" });
  }
},
VenuesideAdd : async (req, res) => {
  try {


   await venuecollection.create({
    VendorId:req.body.VendorId,
    name: req.body.name,
    description: req.body.description,
    email: req.body.email,
    manager: req.body.manager,
    mobile: req.body.mobile,
    location:req.body.location,
    address: req.body.address,
    seats: req.body.seats,
    services: req.body.services,
    rent: req.body.rent,
    image: req.files
   }).then((result)=>{
    console.log(result);
   })
    res.status(201).json({ message: "successfully added" });
  } catch (error) {
    console.log(error.message);
  }
},
singleVenue :async (req, res) => {
  try {
    console.log(req.params);
    const { id } = req.params;
    const venuesingle = await venuecollection.findById({ _id: id });
    res.status(201).json(venuesingle);
  } catch (error) {
    console.log("Error occurred in single view of venue", error);
  }
},
updateVenue : async (req, res) => {
  try {
    const Venuenew = await venuecollection.findByIdAndUpdate(
      req.params.id,
      {
        VendorId: req.body.VendorId,
        name: req.body.name,
        description: req.body.description,
        email: req.body.email,
        manager: req.body.manager,
        mobile: req.body.mobile,
        location: req.body.location,
        address: req.body.address,
        seats: req.body.seats,
        services: req.body.services,
        rent: req.body.rent,
        image: req.files,
      },
      { new: true }
    );
    
    if (!Venuenew) {
      return res.status(404).json({ message: "venue not found" });
    }
    res.json({ data: Venuenew, verified: true });
  } catch (error) {
    console.log("errror");
    res.status(500).json({ message: error.message });
  }
},
Deletevenue : async (req, res) => {
  const id = req.params.id;
  try {
    await venuecollection.findByIdAndDelete(id);
    res.status(200).json({ message: "Venue category deleted successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json();
  }
},
Decorview :async (req, res) => {
  try {
    const allDecor = await Decorcollection.find();
    res.status(200).json({ data: allDecor, verified: true });
  } catch (error) {
    res.status(401).json({ err: "nothing to display" });
  }
},
Decoradd : async (req, res) => {
  try {

    
    await Decorcollection.create({
      VendorId:req.body.VendorId,
      name: req.body.name,
      email: req.body.email,
      manager: req.body.manager,
      type:req.body.type,
      mobile: req.body.mobile,
      desc: req.body.desc,
      rent: req.body.rent,
      image:req.files,
    });

    res.status(201).json({ message: "Successfully added" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
},
singleDecor :async (req, res) => {
  try {
    const { id } = req.params;
    const decorsingle = await Decorcollection.findById({ _id: id });
    res.status(201).json(decorsingle);
  } catch (error) {
    console.log("Error occurred in single view of Decor", error);
  }
},
updateDecor :async (req, res) => {
  try {
    const Decornew = await Decorcollection.findByIdAndUpdate(req.params.id, {
      VendorId:req.body.VendorId,
      name: req.body.name,
      email: req.body.email,
      manager: req.body.manager,
      type:req.body.type,
      mobile: req.body.mobile,
      desc: req.body.desc,
      rent: req.body.rent,
      image:req.files,
    }, {
      new: true,
    });
    if (!Decornew) {
      return res.status(404).json({ message: "Decor not found" });
    }
    res.json({ data: Decornew, verified: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
},
Deletedecor :async (req, res) => {
  const id = req.params.id;
  try {
    await Decorcollection.findByIdAndDelete(id);
    res.status(200).json({ message: "Decor  deleted successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json();
  }
},
 viewphotographer :async (req, res) => {
  try {
    const allphotographer = await photographer.find();
    res.status(200).json({ data: allphotographer, verified: true });
  } catch (error) {
    res.status(401).json({ err: "nothing to display" });
  }
},
photographerAdd :async (req, res) => {
  try {
    await photographer.create({
      VendorId:req.body.VendorId,
      pname: req.body.pname,
      pdesc: req.body.pdesc,
      pemail: req.body.pemail,
      pmobile: req.body.pmobile,
      paddress: req.body.paddress,
      pexperiance: req.body.pexperiance,
      rate: req.body.rate,
      image: req.files,
    });
    res.status(201).json({ message: "successfully added" });
  } catch (error) {
    console.log(error.message);
  }
},
singlePhotographer :async (req, res) => {
  try {
    console.log(req.params);
    const { id } = req.params;
    const photosingle = await photographer.findById({ _id: id });
    console.log(photosingle);
    res.status(201).json(photosingle);
  } catch (error) {
    console.log("Error occurred in single view of photographer", error);
  }
},
 updatePhoto :async (req, res) => {
  try {
    const Photonew = await photographer.findByIdAndUpdate(
      req.params.id,
      {
        VendorId:req.body.VendorId,
        pname: req.body.pname,
        pdesc: req.body.pdesc,
        pemail: req.body.pemail,
        pmobile: req.body.pmobile,
        paddress: req.body.paddress,
        pexperiance: req.body.pexperiance,
        rate: req.body.rate,
        image: req.files,
      },
      {
        new: true,
      }
    );
    if (!Photonew) {
      return res.status(404).json({ message: "Photographer not found" });
    }
    res.json({ data: Photonew, verified: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
},
 Deletephoto :async (req, res) => {
  const id = req.params.id;
  try {
    await photographer.findByIdAndDelete(id);
    res.status(200).json({ message: "Photographer  deleted successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json();
  }
},
viewCatering:async(req,res)=>{
  try {
    const allcatering = await cateringcollection.find();
    res.status(200).json({ data: allcatering, verified: true });
  } catch (error) {
    res.status(401).json({ err: "nothing to display" });
  }
},
cateringAdd:async (req, res) => {
console.log(req.body);
  try {
    await cateringcollection.create({
      VendorId:req.body.VendorId,
      name: req.body.name,
      email: req.body.email,
      manager: req.body.manager,
      type:req.body.type,
      mobile: req.body.mobile,
      desc: req.body.desc,
      rent: req.body.rent,
      address:req.body.address,
      menu:req.body.menu,
      image:req.files,
    });

    res.status(201).json({ message: "Successfully added" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
},
singleCatering :async (req, res) => {
  try {
    const { id } = req.params;
    const decorsingle = await cateringcollection.findById({ _id: id });
    console.log(decorsingle);
    res.status(201).json(decorsingle);
  } catch (error) {
    console.log("Error occurred in single view of Decor", error);
  }
},
updateCatering:async (req, res) => {
  try {
    const Cateringnew = await cateringcollection.findByIdAndUpdate(req.params.id, {
      VendorId:req.body.VendorId,
      name: req.body.name,
      email: req.body.email,
      manager: req.body.manager,
      type:req.body.type,
      mobile: req.body.mobile,
      desc: req.body.desc,
      rent: req.body.rent,
      address:req.body.address,
      menu:req.body.menu,
      image:req.files,
    }, {
      new: true,
    });
    if (!Cateringnew) {
      return res.status(404).json({ message: "Catering not found" });
    }
    res.json({ data: Cateringnew, verified: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
},
DeleteCatering:async (req, res) => {
  const id = req.params.id;
  try {
    await cateringcollection.findByIdAndDelete(id);
    res.status(200).json({ message: "Catering deleted successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json();
  }
},
MakeupView:async(req,res)=>{
  try {
    const allmakeup= await Makeupcollection.find();
    res.status(200).json({ data: allmakeup, verified: true });
  } catch (error) {
    res.status(401).json({ err: "nothing to display" });
  }
},
makeupAdd: async (req, res) => {
  try {
    
    await Makeupcollection.create({
      VendorId:req.body.VendorId,
      name: req.body.name,
      email: req.body.email,
      manager: req.body.manager,
      type:req.body.type,
      mobile: req.body.mobile,
      desc: req.body.desc,
      rent: req.body.rent,
      address:req.body.address,
      image:req.files,
    });

    res.status(201).json({ message: "Successfully added" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
},
singleMakeup:async (req, res) => {
  try {
    const { id } = req.params;
    const makeupsingle = await Makeupcollection.findById({ _id: id });
    res.status(201).json(makeupsingle);
  } catch (error) {
    console.log("Error occurred in single view of Decor", error);
  }
},
updateMake:async (req, res) => {
  try {
    const Makeupnew = await Makeupcollection.findByIdAndUpdate(req.params.id, {
      VendorId:req.body.VendorId,
      name: req.body.name,
      email: req.body.email,
      manager: req.body.manager,
      type:req.body.type,
      mobile: req.body.mobile,
      desc: req.body.desc,
      rent: req.body.rent,
      address:req.body.address,
      image:req.files,
    }, {
      new: true,
    });
    if (!Makeupnew) {
      return res.status(404).json({ message: "Catering not found" });
    }
    res.json({ data: Makeupnew, verified: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
},
DeleteMakeup:async (req,res)=>{
  const id = req.params.id;
  try {
    await Makeupcollection.findByIdAndDelete(id);
    res.status(200).json({ message: "makeup deleted successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json();
  }
},



getAdmin:async(req,res)=>{
  const countuser=await userModels.find({}).count()
  const venuecount=await Venue.find({}).count()
  const venue=await Venue.find()
 const photocount=await photographer.find({}).count()
 const catercount=await cateringcollection.find({}).count()
 const cater=await cateringcollection.find()
 const Decorcount=await Decorcollection.find({}).count()
 const admin=await adminModels.find().count()
 const decor=await Decorcollection.find()
 const user=await userModels.find()
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
 
   let CaterBookings = 0;
   await CaterBook.find().populate('CaterId', 'rent').then(datas => {
     datas.forEach(data => {
       if (data.CaterId && data.CaterId.rent) {
         CaterBookings += parseInt(data.CaterId.rent);
       }
     });
   });
   let MakeBookings=0;
   await MakeBook.find().populate('MakeId','rent').then(datas=>datas.forEach(data=>{
    if(data.MakeId && data.MakeId.rent){
      MakeBookings=parseInt(data.MakeId.rent)+MakeBookings
    }
   }))

   const TotalRevenue=VenueBookings+photoBookings+CaterBookings+MakeBookings+DecorBookings
 
   res.status(200).json({venuecount,countuser,photocount,Decorcount,catercount,makecount,venue,decor,photo,admin,user,cater,make,DecorBookings,photoBookings,CaterBookings,VenueBookings,TotalRevenue,MakeBookings})
  },
  orderAdmin: async (req, res) => {
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
 adminChats:async(req,res)=>{
  try{
      const chat = await ChatModel.find({
          members: { $in: [req.params.vendorId] }
        
      });
   
      res.status(200).json(chat);

  }
catch (error) {
  res.status(500).json(error);
}
},
fetchVendor: async (req,res) =>{
  const id=req.params.vendorId;

  try{
    const data= await userModels.find({_id:id})
    res.status(200).json({data})
  } catch (error){
    res.status(500).json(error)
  }

},
getVendor:async(req,res)=>{
  const id=req.params.vendorId;

  try{
    const data = await userModels.find({_id:id})
    res.status(200).json({data})
  }catch (error){
    res.status(500).json(error)
  }
},


}