const express=require('express');
const router=express.Router();

router.post("/",createChat)
router.get("/:userId",userChats)


module.exports=router;