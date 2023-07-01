const MessageModel=require("../models/MessageModel")



module.exports={

    addMessage:async(req,res)=>{
        const {chatId,senderId,text}=req.body;
        const message= new MessageModel({
            chatId,
            senderId,
            text
        });
        try{
            const result= await message.save();
            res.status(200).json(result)
        }catch (error) {
            res.status(500).json(error)
        }
    
    },
    
}