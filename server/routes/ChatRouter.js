const express=require('express');
const router=express.Router();
const Chat=require("../controllers/ChatController")

router.post("/",Chat.createChat)
router.get("/:userId",Chat.userChats)
router.get("/find/:firstId/:secondId",Chat.findChat)

module.exports=router;