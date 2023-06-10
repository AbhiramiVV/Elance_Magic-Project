const mongoose = require("mongoose");
const twilio = require("../utility/twilio");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModels = require("../models/userModels/userDetails");
const { randomNumber } = require("../randomNum");
const { sentMail } = require("../config/otp");
const photographer = require("../models/admin/Photographer");
const Decorcollection = require("../models/admin/Decoration");

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
     await user.save();

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
    const phonenumber = req.body.data.mobile;
    console.log(phonenumber);
      let otp = randomNumber();
      console.log(otp);
      twilio.sendVerificationToken(phonenumber, otp);

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
      console.log(data.password);
      console.log(data.email);

      const userExist = await userModels.findOne({ email: data.email });
      console.log("here the details" + userExist);

      if (userExist) {
        id = userExist._id;
        console.log("hashed password", userExist.password);

        const checkpassword = await bcrypt.compare(
          data.password,
          userExist.password
        );

        console.log("passwords match?", checkpassword);

        if (data.email == userExist.email && checkpassword == true) {
          const token = createToken(userExist._id);

          console.log("token", token);

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
      console.log(photo);
      res.status(201).json({ data: photo });
    } catch (error) {}
  },
Decordisplay : async (req, res) => {
    try {
      const Decoration = await Decorcollection.find({});
      console.log(Decoration);
      res.status(201).json({ data: Decoration });
    } catch (error) {}
  },

};
