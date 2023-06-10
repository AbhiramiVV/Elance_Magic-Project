const express=require('express');
const router=express.Router();
const User=require('../controllers/userController');

// const userAuth=require('../middleware/userAuth')

router.post('/login',User.login)

router.post('/signup',User.postsignup)
router.post('/otp',User.verifyUserSignup)
router.post('/resendOtp',User.postResend);
router.post('/forgotPassword',User.forgotPassword)
router.post('/ChangePasswordOtp', User.ChangePasswordOtp);
router.post('/changePassword', User.changePassword);
router.get('/photodisplay',User.photodisplay)
router.get('/Decordisplay',User.Decordisplay)
router.get('/singlePhotographer/:id',User.singlePhoto)
router.get('/Decordisplay',User.Decordisplay)
router.get('/venuedisplay',User.venuedisplay)


module.exports=router;