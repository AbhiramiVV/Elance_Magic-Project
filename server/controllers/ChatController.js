const jwt = require("jsonwebtoken");
const { ChatModel } = require("../models/chatModel");

module.exports={

    createChat: async (req, res) => {
        const { senderId, Id } = req.body;
      
        try {
          // Check if the chat already exists with the given members
          const existingChat = await ChatModel.findOne({
            members: { $all: [senderId, Id] },
          });
      
          if (existingChat) {
            // Chat already exists
            return res.status(200).json({sucess:true});
          }
      
          // Create a new chat
          const newChat = new ChatModel({
            members: [senderId, Id],
          });
      
          const result = await newChat.save();
          res.status(200).json({sucess:true});
        } catch (error) {
          res.status(500).json(error);
        }
      },
      
    userChats:async(req,res)=>{
        try{
            const chat = await ChatModel.find({
                members: { $in: [req.params.userId] }
            });
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