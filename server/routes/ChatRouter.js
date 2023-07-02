const express=require('express');
const router=express.Router();
const Chat=require("../controllers/ChatController")
const userAuth=require('../middleware/userAuth')

router.post("/",Chat.createChat)
router.use(userAuth)

router.get("/",Chat.userChats)
router.get("/find/:firstId/:secondId",Chat.findChat)

module.exports=router;