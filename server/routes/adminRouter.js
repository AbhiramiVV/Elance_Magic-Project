const express = require("express");
const router = express.Router();
const upload = require("../utility/multer");
const multiUpload = require("../utility/multiUpload");
const admin = require("../controllers/adminController");
const adminAuth = require("../middleware/adminAuth");

router.post("/vendor", admin.login);
router.get('/checkAuthe',admin.adminAuthe)

router.post("/vendorSignup", upload.single("file"), admin.postSignup);
router.post("/otp", admin.verifyvendorSignup);
router.use(adminAuth)
router.get("/providerDetails/:id", admin.providerDetails);
router.post("/removeService", admin.removeService);
router.post("/addService/:id", admin.addService);
router.get("/editProfile/:id", admin.editProfileGet);
router.patch("/editProfile", admin.editProfilePatch);
router.get("/Venuedisplay", admin.Venuecategory);
router.post("/Venueadd", upload.single("file"), admin.addVenue);
router.delete("/deletecat/:id", admin.Deletecat);
router.get("/venuecollectView", admin.venuecollectview);
router.post("/addVenueside", multiUpload, admin.VenuesideAdd);
router.get("/singleVenue/:id", admin.singleVenue);
router.put("/venuEdit/:id", multiUpload, admin.updateVenue);
router.delete("/deletevenue/:id", admin.Deletevenue);
router.get("/Decorview", admin.Decorview);
router.post("/addDecor", multiUpload, admin.Decoradd);
router.get("/singleDecor/:id", admin.singleDecor);
router.put("/decoredit/:id", multiUpload, admin.updateDecor);
router.delete("/deletedecor/:id", admin.Deletedecor);
router.get("/photographerView", admin.viewphotographer);
router.post("/addPhotographer", multiUpload, admin.photographerAdd);
router.get("/singlePhotographer/:id", admin.singlePhotographer);
router.put("/photoedit/:id", multiUpload, admin.updatePhoto);
router.delete("/deletephoto/:id", admin.Deletephoto);
router.get("/catering", admin.viewCatering);
router.post("/addCatering", multiUpload, admin.cateringAdd);
router.get("/singleCatering/:id", admin.singleCatering);
router.put("/cateringedit/:id", multiUpload, admin.updateCatering);
router.delete("/catering/:id", admin.DeleteCatering);
router.get("/makeup", admin.MakeupView);
router.post("/addMakeup", multiUpload, admin.makeupAdd);
router.get("/singleMakeup/:id", admin.singleMakeup);
router.put("/makeedit/:id", multiUpload,admin.updateMake);
router.delete("/makeup/:id", admin.DeleteMakeup);
router.get("/orderDetails", admin.orderAdmin);
router.get("/getall", admin.getAdmin);
router.get("/:vendorId", admin.adminChats);
router.get("/vendorchat/:vendorId", admin.fetchVendor);
router.get("/vendorchat/:users", admin.getVendor);

module.exports = router;
