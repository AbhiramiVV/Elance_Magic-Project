const jwt = require("jsonwebtoken");
const { ChatModel } = require("../models/chatModel");

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
    },
    userChats:async(req,res)=>{
        const { authorization } = req.headers;
        const token = authorization;
        const { _id } = jwt.verify(token, 'usersecretkey');
        console.log(_id);
        try{
            const chat = await ChatModel.find({
                members: { $in: [_id] }
            });
            console.log(chat, '000000000');
            res.status(200).json(chat);

        }
      catch (error) {
        res.status(500).json(error);
      }
    },
    findChat:async(req,res)=>{
        try{
            const chat = await ChatModel.findOne({
                members:{$all :[req.params.firstId,req.params.secondId]}
            })
            res.status(200).json(chat)

        }
        catch (error){
            res.status(500).json(error)
        }

    }


}