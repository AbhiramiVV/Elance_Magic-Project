const mongoose = require("mongoose");
const twilio = require("../utility/twilio");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModels = require("../models/userModels/userDetails");
const { randomNumber } = require("../randomNum");
const { sentMail } = require("../config/otp");
const photographer = require("../models/admin/Photographer");
const Decorcollection = require("../models/admin/Decoration");
const venueCategory = require("../models/admin/Venuecat");
const venuecollection = require("../models/admin/Venue");
const cateringcollection = require("../models/admin/Catering");
const Makeupcollection = require("../models/admin/makeupSchema");
const PhotoBook = require("../models/userModels/PhotoBook");

const createToken = (_id) => {
  return jwt.sign({ _id }, "usersecretkey", { expiresIn: "3d" });
};

module.exports = {
  postsignup: async (req, res) => {
    try {
      
      const {name,email,mobile,password,cpassword} = req.body;
      const userExist = await userModels.findOne({ mobile:mobile });

      if (userExist) {
        res
          .status(200)
          .json({
            message: "Already registered using this mobile number",
            state: false,
          });
      } else {
        let otp=randomNumber();
        //twilio.sendVerificationToken(mobile,otp);
        sentMail(email,otp);

        const userToken=jwt.sign({
          otp:otp,

      },
      "00f3f20c9fc43a29d4c9b6b3c2a3e18918f0b23a379c152b577ceda3256f3ffa");
      let bcrypPassword=await bcrypt.hash(password,10)
      let user= await userModels.create({
        name,
        email,
        mobile,
        password:bcrypPassword,
        cpassword:bcrypPassword,
    });

      return res.cookie("signupToken", userToken, {
          httpOnly: true,
          secure: true,
          maxAge: 1000 * 60 * 60 * 24 * 7,
          sameSite: "none",
      }).json({ err: false ,message:'Otp send successfull'});
      
      }
    } catch (error) {
      console.log("error", error);
    }
  },
   verifyUserSignup:async(req,res)=>{
     console.log(req.body);
    const {name,email,mobile,password}=req.body
  
    let otp=req.body.OTP;
    let userToken=req.cookies.signupToken;
     const OtpToken = jwt.verify(userToken,'00f3f20c9fc43a29d4c9b6b3c2a3e18918f0b23a379c152b577ceda3256f3ffa')
   let user=await userModels.findOne({email:email})
    if(otp==OtpToken.otp){

        
        const userToken=jwt.sign({
            id:user._id
        },
        "00f3f20c9fc43a29d4c9b6b3c2a3e18918f0b23a379c152b577ceda3256f3ffa");
        return res.cookie("userToken", userToken, {
            httpOnly: true,
            secure: true,
            maxAge: 1000 * 60 * 60 * 24 * 7,
            sameSite: "none",
        }).json({ err: false ,message:'User registration success'});
    }else{
        res.json({err:true,message:'something went wrong'})
    }

},
postResend: async (req, res) => {
  try {
    // console.log(req.body.data);
    //const phonenumber = req.body.data.mobile;
    const email=req.body.data.email;
    console.log(email);
      let otp = randomNumber();
      console.log(otp);
      //twilio.sendVerificationToken(phonenumber, otp);
      sentMail(email,otp);
      const userToken = jwt.sign({
          otp: otp,
      }, "00f3f20c9fc43a29d4c9b6b3c2a3e18918f0b23a379c152b577ceda3256f3ffa");

      return res.cookie("signupToken", userToken, {
          httpOnly: true,
          secure: true,
          maxAge: 1000 * 60 * 60 * 24 * 7,
          sameSite: "none",
      }).json({ err: false, message: 'Otp send successfully' });
  } catch (error) {
      // Handle the error here
      console.error(error);
      return res.status(500).json({ err: true, message: 'Internal server error' });
  }
},
  login: async (req, res) => {
    try {
      const data = req.body;
      const userExist = await userModels.findOne({ email: data.email });

      if (userExist) {
        id = userExist._id;

        const checkpassword = await bcrypt.compare(
          data.password,
          userExist.password
        );

        console.log("passwords match?", checkpassword);

        if (data.email == userExist.email && checkpassword == true) {
          const token = createToken(userExist._id);


          res.status(200).json({
            token,
          });

          console.log("login successful");
        } else {
          res.status(401).json({ error: "Incorrect login details" });
        }
      }
    } catch (error) {
      console.log(error);
    }
  },
  forgotPassword :async (req, res) => {
    
    try {
      const user = await userModels.findOne({
        email: req.body.phone,
        isBlocked: false,
      });
      if (user) {
        let otp =randomNumber()
       // twilio.sendVerificationToken(mobile, otp);
         sentMail(user.email,otp);
         const tempToken = jwt.sign({
          otp: otp,
      }, "00f3f20c9fc43a29d4c9b6b3c2a3e18918f0b23a379c152b577ceda3256f3ffa");

      return res.cookie("tempToken", tempToken, {
          httpOnly: true,
          secure: true,
          maxAge: 1000 * 60 * 60 * 24 * 7,
          sameSite: "none",
      }).json({ err: false, message: `Otp send successfully ${user.email}` });
   
  }
}catch(err){
    console.log(err);
  }
  },

  ChangePasswordOtp: async (req, res) => {
    try {
      
      const { email, otp } = req.body;
      let user=await userModels.findOne({email:email})
      let tempToken=req.cookies.tempToken
      const OtpToken = jwt.verify(tempToken,'00f3f20c9fc43a29d4c9b6b3c2a3e18918f0b23a379c152b577ceda3256f3ffa')
      if(otp==OtpToken.otp){
        let id=user._id;
        const tempToken = jwt.sign({
          ID:id,
      }, "00f3f20c9fc43a29d4c9b6b3c2a3e18918f0b23a379c152b577ceda3256f3ffa");

      return res.cookie("tempToken", tempToken, {
          httpOnly: true,
          secure: true,
          maxAge: 1000 * 60 * 60 * 24 * 7,
          sameSite: "none",
      }).status(200).json('success')
      }else{
        res.status(404).json("Not found")

      }
       
 
    } catch (error) {
      res.status(500).json("Server error. Please contact the developer.");
    }
  },
  changePassword: async (req, res) => {
    try {
      let tempToken=req.cookies.tempToken
      const OtpToken = jwt.verify(tempToken,'00f3f20c9fc43a29d4c9b6b3c2a3e18918f0b23a379c152b577ceda3256f3ffa')
      let id=OtpToken.ID

      const {password }= req.body;
      let bcrypPassword=await bcrypt.hash(password,10)

       await userModels.updateOne({_id:id},{$set:{password:bcrypPassword}}).then(()=>{
        res.status(200).json("success")
       })
    } catch (error) {
      res.status(500).json("Server error. Please contact the developer.");
    }
  },
photodisplay : async (req, res) => {
    try {
      const photo = await photographer.find({});
      res.status(201).json({ data: photo });
    } catch (error) {}
  },
  singlePhoto :async (req, res) => {
    try {
      const { id } = req.params;
      const photosingle = await photographer.findById({ _id: id });
      res.status(201).json(photosingle);
    } catch (error) {
      console.log("Error occurred in single view of photographer", error);
    }
  },
Decordisplay : async (req, res) => {
    try {
      const Decoration = await Decorcollection.find({});
      res.status(201).json({ data: Decoration });
    } catch (error) {}
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
  venuedisplay :async (req, res) => {
    try {
      const Venuecollect = await venuecollection.find({});
      res.status(201).json({ data: Venuecollect });
    } catch (error) {}
  },
  singleVenue :async (req, res) => {
    try {
      const { id } = req.params;
      const venuesingle = await venuecollection.findById({ _id: id });
      res.status(201).json(venuesingle);
    } catch (error) {
      console.log("Error occurred in single view of venue", error);
    }
  },
  cateringDiaplay:async(req,res)=>{
    try{
      const CateringColl = await cateringcollection.find({});
      res.status(201).json({data:CateringColl});
    }catch (error){}
  },
  singleCater:async(req,res)=>{
    try{
      const {id}=req.params;
      const catersingle= await cateringcollection.findById({_id:id});
      res.status(201).json(catersingle);
    }catch(error){
      console.log("error occured in single catering ",error);
    }
  },
  MakeupDiaplay:async(req,res)=>{
    try{
      const Makeupcoll = await Makeupcollection.find({});
      res.status(201).json({data:Makeupcoll});
    }catch(error){
      console.log("error");
    }
  },
  singleMakeup:async(req,res)=>{
    try{
      const {id}=req.params;
      const makeupsingle = await Makeupcollection.findById({_id:id});
      res.status(201).json(makeupsingle);
    }catch(error){
      console.log("error occured in single makeup",error);
    }
  },


// -----------------photoDate- Book-----------------

  checkDate :async (req, res) => {
    try {
      const { id } = req.params;
      console.log("in the check date function" );
      const date = req.body.date;
  
      const { authorization } = req.headers;
      const token = authorization;
  
      const { _id } = jwt.verify(token, "usersecretkey");
  
  console.log(date)
  const newStartDate = new Date(date)
        const startDate = newStartDate.toISOString().split('T')[0]
        console.log(startDate,'startDate')   
         const photographerExist = await PhotoBook.findOne({$and:[{PhotoId:id},{Date:startDate}]})
      console.log(photographerExist,'photoexist');
      
  const isExist =  Boolean(photographerExist) 
      console.log(isExist,'isexist');
        res.status(200).json({isExist});
      
    } catch (error) {}
  
  },
  PhotoBook : async (req, res) => {
    try {
      const { id } = req.params;
      console.log("id is here" + id);
      const date = req.body.selectedDate;
      console.log(date,'date');
      const newStartDate = new Date(date)
      const startDate = newStartDate.toISOString().split('T')[0]
      console.log(startDate,'startdate')
      const { authorization } = req.headers;
      const token = authorization;
      const { _id } = jwt.verify(token, "usersecretkey");
  
      console.log(_id,'id of jwt');
  
      const photographerExist = await PhotoBook.findOne(
        {$and:[{PhotoId:id},{Date:startDate}]}
      );
      console.log(photographerExist);
  
    if(photographerExist){
      res
      .status(200)
      .json({ message: "already booked", action: true });
    }else{
          const Bookingphoto = new PhotoBook({
          userId: _id,
          PhotoId: id,
          Date: startDate,
        });
        await Bookingphoto.save();
  
      
      res
        .status(200)
        .json({ message: "Payment done successfully", action: true });}
    } catch (error) {}
  },

// ------------evetDate--book----------

};
