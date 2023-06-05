const jwt = require("jsonwebtoken");
const twilio = require("../utility/twilio");
const upload=require("../utility/multer")
const bcrypt = require("bcrypt");
const mailer = require("../config/otp");
const { randomNumber } = require("../randomNum");
const adminModels = require("../models/admin/AdminSchema");
const userModels = require("../models/userModels/userDetails");
const { sentMail } = require("../config/otp");
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
    console.log(req.body)
    try {
      
      const {companyName,description,phone,email,password,selectedPlace,selectedService,certificate} =req.body
      console.log(req.file);
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
          category: selectedService,
          place: selectedPlace,
          mobile:phone,

          verified: false,
          approved: false,
          password:   bcrypPassword,
          certificate: req.file,
          // coverPhoto: userDetail.coverPhoto,
          // profilePhoto: userDetail.profilePhoto,
          // gallery: userDetail.gallery,
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
    
    console.log(req.body)
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

 customerview :async (req, res) => {
  try {
    const alluser = await userModels.find();
    res.status(201).json({ data: alluser });
  } catch (error) {
    res.status(404).json({ message: "error occured" });
  }
},
providerDetails :async (req, res) => {

  try {
    console.log(req.params.id);
    const id=req.params.id;
    const provider = await adminModels.findOne({ _id: id});
    res.status(200).json({ data: provider });
  } catch (error) {
    res.status(500).json({ message: error });
  }
}
}