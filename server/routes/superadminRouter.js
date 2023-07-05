const express=require("express");
const router=express.Router()
const multer=require('../utility/multer')
const superadminController=require("../controllers/superadminController")
  const superAuth=require('../middleware/superAuth');
const multiUpload = require("../utility/multer");
const upload = require("../utility/multer");

router.post("/superlogin",superadminController.login)


  router.use(superAuth)
  router.get('/customerdisplay',superadminController.customerview)
  router.put('/blockuser/:id', superadminController.blockUser)
 router.get('/viewadmin', superadminController.viewadmin)
  router.post("/addadmin",superadminController.insertAdmin)
 router.get("/viewadminsingle/:id",superadminController.singleviewadmin)
 router.put("/adminedit/:id", upload.single('file') ,superadminController.updateadmin);
 router.get("/approved/:id",superadminController.approved);
router.get("/reject/:id",superadminController.reject);
router.get("/transactions", superadminController.transactions);
router.put('/blockadmin/:id', superadminController.blockAdmin)
router.get('/getall', superadminController.getAdmin)

module.exports=router;