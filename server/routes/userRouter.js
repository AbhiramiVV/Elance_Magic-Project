const express = require("express");
const router = express.Router();
const User = require("../controllers/userController");

const userAuth = require("../middleware/userAuth");

router.post("/login", User.login);
router.get('/checkAuth',User.userAuthe)
router.post("/signup", User.postsignup);
router.post("/otp", User.verifyUserSignup);
router.post("/resendOtp", User.postResend);
router.post("/forgotPassword", User.forgotPassword);
router.post("/ChangePasswordOtp", User.ChangePasswordOtp);
router.post("/changePassword", User.changePassword);

router.post("/checkDate/:id", User.checkDate);
router.post("/photoBookadd/:id", User.PhotoBook);
router.post("/BookVenue/:id", User.VenueBook);
router.post("/checkvenueDate/:id", User.checkVenue);
router.post("/BookDecor/:id", User.DecorBook);
router.post("/checkdecorDate/:id", User.checkDecor);
router.post("/checkcaterDate/:id", User.checkCater);
router.post("/BookCater/:id", User.CaterBook);
router.post("/checkmakeDate/:id", User.checkMakeup);
router.post("/BookMake/:id", User.MakeBook);

router.get("/Orderdisplay", User.Order);
router.put("/cancelItem/:id", User.itemCancel);
router.get("/userchat/:userId", User.feachUser);
router.get("/vendorchat/:users", User.feachVendor);

router.use(userAuth);

router.get("/photodisplay", User.photodisplay);
router.get("/singlePhotographer/:id", User.singlePhoto);
router.get("/Decordisplay", User.Decordisplay);
router.get("/singleDecor/:id", User.singleDecor);
router.get("/venuedisplay", User.venuedisplay);
router.get("/singleVenue/:id", User.singleVenue);
router.get("/cateringedisplay", User.cateringDiaplay);
router.get("/singleCater/:id", User.singleCater);
router.get("/makeupdisplay", User.MakeupDiaplay);
router.get("/singleMake/:id", User.singleMakeup);
module.exports = router;
