import React, { useEffect, useRef, useState } from 'react'
import './ChatBoxadmin.css'
import InputEmoji from 'react-input-emoji'
import axios  from '../../instance/axios';
import { toast } from "react-toastify";
import { format } from "timeago.js";
import { useAuthContext } from '../../Hooks/useAuthContext';

const toastConfig = {
  position: "top-center",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored",
};
function ChatBoxadmin({chat,currentUser, setSendMessage, receivedMessage,setReceiver}) {
    const [userData,setUserData]=useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [showMenu, setShowMenu] = useState(false);
    // const [image, setImage] = useState(null);
    // const scroll = useRef();
    const imageRef = useRef();

    const {admin}=useAuthContext();
  
    // feaching data for header
    useEffect (()=>{
        const users = chat?.members?.find((id) => id !== currentUser);
     
        const getUserData = async () => {
                try {
                    const response= await axios.get(`/vendor/vendorchat/${users}`,{headers: {
                        Authorization: `${admin.token}`,
                      }})
                      setUserData(response.data.data[0])
                } catch (error) {
                    alert("No chat are available")
                }
            
        };

        if (chat !== null) getUserData();
    }, [chat, currentUser]);


    const handleChange = (newMessage) => {
      setNewMessage(newMessage)
  }
  setReceiver(chat?.members.find((id) => id !== currentUser))

     // fetch messages
     useEffect(() => {
      const fetchMessages = async () => {
        try {
          const { data } = await axios.get(`/message/${chat._id}`);
          setMessages(data);
        } catch (error) {
          alert("network problem");
        }
      };
    
      if (chat !== null) {
        fetchMessages();
      }
    }, [chat]);
    

  // Always scroll to last Message
  useEffect(() => {
      scroll.current?.scrollIntoView({ behavior: "smooth" });
      setShowMenu(false)
      // setImage(null)
      // setVideoFile(null)
  }, [messages])



  // Send Message
  const handleSend = async (e) => {
      // e.preventDefault()
      const message = {
          senderId: currentUser,
          text: newMessage,
          chatId: chat._id,
          type: "text",
      }
      const receiverId = chat.members.find((id) => id !== currentUser);
      setSendMessage({ ...message, receiverId })

      try {
  
              const { data } = await axios.post('/message/', message);
              setMessages([...messages, data]);
              setNewMessage("");
         

      }
      catch
      {
          alert("NETWORK PROBLEM!!!!!!!!!!!!!")
      }
  }


    // Receive Message from parent component
    useEffect(() => {
      if (receivedMessage !== null && receivedMessage.chatId === chat._id) {
          setMessages([...messages, receivedMessage]);
      }

  }, [receivedMessage])

    
    return (
      <>
        <div className="ChatBox-container">
          {chat ? (
            <>
              {/* chat-header */}
              <div className="chat-header">
                <div className="follower">
                  <div>
                  <img
                                            src={

                                                userData?.profilePhoto ? userData.profilePhoto : "img-scelton.png"
                                            }
                                            alt="Profile"
                                            className="rounded-full "

                                            style={{ width: "50px", height: "50px" }}
                                        />
                    <div className="name" style={{ fontSize: "0.9rem" }}>
                      <span>
                        {userData?.name ? userData?.name : userData?.email}
                      </span>
                    </div>
                  </div>
                </div>
                <hr
                  style={{
                    width: "95%",
                    border: "0.1px solid #ececec",
                    marginTop: "20px",
                  }}
                />
              </div>
              {/* chat-body */}
              <div className="chat-body" >
                {messages.map((message) => (
                  <>
                    <div ref={scroll}
                      className={
                        message.senderId === currentUser
                          ? "message own"
                          : "message"
                      }
                    >
                      <span>{message.text}</span>{" "}
                      <span>{format(message.createdAt)}</span>
                    </div>
                  </>
                ))}
              </div>
              {/* chat-sender */}
              <div className="chat-sender">
                <div onClick={() => imageRef.current.click()}>+</div>
                <InputEmoji
                  value={newMessage}
                  onChange={handleChange}
                />
                <div className="send-button button" onClick = {handleSend}>Send</div>
                <input
                  type="file"
                  name=""
                  id=""
                  style={{ display: "none" }}
                  ref={imageRef}
                />
              </div>{" "}
            </>
          ) : (
            <span className="chatbox-empty-message">
              Tap on a chat to start conversation...
            </span>
          )}
        </div>
      </>
    );
  };
export default ChatBoxadmin;
