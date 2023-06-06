const express=require('express');
const router=express.Router();
const upload=require('../utility/multer')

 const admin=require('../controllers/adminController')
// const adminAuth=require('../middleware/adminAuth')



router.post('/vendor',admin.login)
router.post('/vendorSignup',upload.single('file'),admin.postSignup)
router.post('/otp',admin.verifyvendorSignup)
router.get('/customerdisplay',admin.customerview)
router.get("/providerDetails/:id",admin.providerDetails)
router.post("/removeService", admin.removeService);


// router.use(adminAuth)




 module.exports=router;