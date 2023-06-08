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
router.patch("/editProfile",admin.editProfilePatch)
router.get('/Venuedisplay',admin.Venuecategory)
router.post('/Venueadd',multiUpload,admin.addVenue)
router.delete("/deletecat/:id",admin.Deletecat)
router.get('/venuecollectView',admin.venuecollectview)
router.post('/addVenueside',multiUpload,admin.VenuesideAdd)

router.get('/singleVenue/:id',admin.singleVenue)

   


// router.use(adminAuth)




 module.exports=router;