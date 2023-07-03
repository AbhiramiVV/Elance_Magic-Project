import React, { useEffect, useState } from "react";
import axios from "../../instance/axios";
import "./chat.css";
import { useAuthContext } from "../../Hooks/useAuthContext";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import Conversation from "../../Component/Coversation/Coversation"
const Chat = () => {
  const { user } = useAuthContext();
  const [chats, setChats] = useState([]);
//   const [onlineUsers, setOnlineUsers] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const userId=user.userExist._id;
  const showEstimateClose = () => setShowEstimate(false);

  useEffect(() => {

    const getChats = async () => {
      try {
        const { data }= await axios.get(`/chat/${userId}`,{
            headers: {
              Authorization: `${user.token}`,
            },
          })
        setChats(data);
      } catch (error) {
        
      }
    };
    getChats();
  }, []);
 
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
                                    <Conversation
                                        key={i}
                                        data={chat}
                                        currentUser={user.id}
                                        online={checkOnlineStatus(chat)}
                                        type="user"
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
                    {/* <ChatBox
                        chat={currentChat}
                        currentUser={userId}
                        setSendMessage={setSendMessage}
                        receivedMessage={receivedMessage}
                        type="user"
                        showEstimate={setShowEstimate}
                        setReceiver={setReceiver}
                    /> */}
                </div>
            </div>
            {/* <ShowEstimateModal onClose={showEstimateClose} visible={showEstimate} userId={userId} managerId={receiver} /> */}
        </>
    );
};

export default Chat;