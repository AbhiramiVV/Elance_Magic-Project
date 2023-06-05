const mongoose = require("mongoose");
const twilio = require("../utility/twilio");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModels = require("../models/userModels/userDetails");
const { randomNumber } = require("../randomNum");
const { sentMail } = require("../config/otp");

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
        twilio.sendVerificationToken(mobile,otp);
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
    const { mobile } = req.body;
    console.log(req.body);
    try {
      const user = await userModels.findOne({
        mobile: req.body.mobile,
        isBlocked: false,
      });
      if (user) {
        const response = await twilio.sendVerificationToken(mobile, otp);
        
        if (response.status === true) {
          res
            .status(201)
            .json(`otp send successfully at to change password ${mobile}`);
        } else {
          res
            .status(500)
            .json(
              `otp failed for network error   at ${mobile} contact developer`
            );
        }
      } else {
        res.status(400).json(`there is no user with mobile number${mobile}`);
      }
    } catch (error) {
      res.status(500).json("server addichu poy, call the developer");
    }
  },

};
