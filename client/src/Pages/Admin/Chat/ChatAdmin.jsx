import React, { useEffect, useRef, useState } from "react";
import axios from "../../../instance/axios";
import "./chatAdmin.css";
import {io} from 'socket.io-client'
import { useAuthContext } from "../../../Hooks/useAuthContext";
import ConversationAdmin from "../CoversationAdmin";
import ChatBoxadmin from "../../../Component/ChatBox Admin/ChatBoxadmin";
const ChatAdmin = () => {
    const socket = useRef();
  const { admin } = useAuthContext();
  const [chats, setChats] = useState([]);
 const [onlineUsers, setOnlineUsers] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [sendMessage, setSendMessage] = useState(null);
  const [receivedMessage, setReceivedMessage] = useState(null);
  const [showEstimate, setShowEstimate] = useState(false);
  const [receiver, setReceiver] = useState("");
  const vendorId=admin.adminExist._id;
  const showEstimateClose = () => setShowEstimate(false);

  useEffect(() => {

    const getChats = async () => {
      try {
        const { data }= await axios.get(`/vendor/${vendorId}`,{
            headers: {
              Authorization: `${admin.token}`,
            },
          })
   
        setChats(data);
      } catch (error) {
        
      }
    };
    getChats();
  }, []);

   // Connect to Socket.io
   useEffect(() => {
    socket.current = io('http://localhost:8800');
    socket.current.emit("new-user-add", vendorId);
    socket.current.on("get-users", (users) => {
        setOnlineUsers(users);
    });
}, [vendorId]);
 

 // Send Message to socket server
 useEffect(() => {
    if (sendMessage !== null) {
        socket.current.emit("send-message", sendMessage);
    }
}, [sendMessage]);


// Get the message from socket server
useEffect(() => {
    socket.current.on("recieve-message", (data) => {
        setReceivedMessage(data);
    }

    );
}, []);


  const checkOnlineStatus = (chat) => {
    const chatMember = chat.members.find((member) => member !== vendorId);
    const online = onlineUsers.find((user) => user.userId === chatMember);
    return online ? true : false;
};
    return (
        <>
     
            <div className="Chat p-5">
                {/* Left Side */}
                <div className="Left-side-chat">
                    {/* <LogoSearch /> */}
                    <div className="Chat-container bg-white no-scrollbar ">
                        <h2 className="font-extrabold text-4xl text-center font-Volkhov">Chats</h2>
                        <div className="Chat-list">
                            {chats.map((chat, i) => (
                                <div
                                    onClick={() => {
                                        setCurrentChat(chat);
                                    }}
                                >
                                    <ConversationAdmin
                                    key={i}
                                    data={chat}
                                    currentUser={vendorId}
                                    online={checkOnlineStatus(chat)}
                                    
                                    />

                                   
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Side */}

                <div className="Right-side-chat ">
                    {/* <div style={{ width: "20rem", alignSelf: "flex-end" }}>
                    <NavIcons />
                </div> */}
                    <ChatBoxadmin
                        chat={currentChat}
                        currentUser={vendorId}
                        setSendMessage={setSendMessage}
                        receivedMessage={receivedMessage}
                        type="user"
                        showEstimate={setShowEstimate}
                        setReceiver={setReceiver}
                    />
                </div>
            </div>
      
        </>
    );
};

export default ChatAdmin;