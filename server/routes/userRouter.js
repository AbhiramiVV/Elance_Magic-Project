const express=require('express');
const router=express.Router();
const User=require('../controllers/userController');

const userAuth=require('../middleware/userAuth')

router.post('/login',User.login)

router.post('/signup',User.postsignup)
router.post('/otp',User.verifyUserSignup)
router.post('/resendOtp',User.postResend);
router.post('/forgotPassword',User.forgotPassword)
router.post('/ChangePasswordOtp', User.ChangePasswordOtp);
router.post('/changePassword', User.changePassword);


router.use(userAuth)

router.get('/photodisplay',User.photodisplay)
router.get('/singlePhotographer/:id',User.singlePhoto)
router.get('/Decordisplay',User.Decordisplay)
router.get('/singleDecor/:id',User.singleDecor)
router.get('/venuedisplay',User.venuedisplay)
router.get('/singleVenue/:id',User.singleVenue)
router.get('/cateringedisplay',User.cateringDiaplay);
router.get('/singleCater/:id',User.singleCater);
module.exports=router;