const ChatModel=require("../models/chatModel")


module.exports={

    createChat:async(req,res)=>{

        const newChat=new ChatModel({
            members :[req.body.senderId,req.body.receiverId]
        });
        try{
            const result =await newChat.save();
            res.status(200).json(result);
        }catch (error){
            res.status(500).json(error)
        }
    }

}