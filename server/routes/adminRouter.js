const express=require('express');
const router=express.Router();
const upload=require('../utility/multer')
const multiUpload=require('../utility/multer')
 const admin=require('../controllers/adminController')
// const adminAuth=require('../middleware/adminAuth')



router.post('/vendor',admin.login)
router.post('/vendorSignup',multiUpload,admin.postSignup)
router.post('/otp',admin.verifyvendorSignup)
router.get('/customerdisplay',admin.customerview)
router.get("/providerDetails/:id",admin.providerDetails)
router.post("/removeService", admin.removeService);
router.post("/addService/:id", admin.addService);
router.get("/editProfile/:id",admin.editProfileGet);
router.patch("/editProfile",multiUpload,admin.editProfilePatch)
router.get('/Venuedisplay',admin.Venuecategory)
   


// router.use(adminAuth)




 module.exports=router;