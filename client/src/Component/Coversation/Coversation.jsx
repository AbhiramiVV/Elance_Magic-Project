import React, { useState } from "react";
import { useEffect } from "react";
import axios from "../../instance/axios"
import { useAuthContext } from "../../Hooks/useAuthContext";

const Conversation = ({ data, currentUser, online, type }) => {

    const [userData, setUserData] = useState(null)

const {user}=useAuthContext()
    useEffect(() => {

        const userId = data.members.find((id) => id !== currentUser)
        console.log(userId,'9999');
        const getUser = async()=>{
            const {data}=await axios.get(`/userchat/${userId}`,{headers: {
                Authorization: `${user.token}`,
              }})
              console.log(data,'dataa');
            setUserData(data)
        }
        getUser();
    },[user])
    return (
        <>
      
            <div className="follower conversation ">
                <div className="flex items-center">
                    {online && <div className="online-dot"></div>}
                    <img
                        src={userData?.profilePhoto ? userData.profilePhoto : "img-scelton.png"}
                        alt="Profile"
                        className="rounded-full"
                        style={{ width: "50px", height: "50px" }}
                    />
                    <div className="name flex flex-col ml-4" style={{ fontSize: '0.8rem' }}>
                        <span className="text-xl font-bold break-all">{userData?.companyname ? userData?.companyname : userData?.email}</span>
                        <span style={{ color: online ? "#51e200" : "" }}>{online ? "Online" : "Offline"}</span>
                    </div>
                </div>
            </div>
            <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
        </>
    );
};

export default Conversation;