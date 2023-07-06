import React, { useState } from "react";
import { useEffect } from "react";
import axios from "../../instance/axios"
import { useAuthContext } from "../../Hooks/useAuthContext";

const CoversationAdmin = ({ data, currentUser, online, type }) => {

    useEffect (()=>{
        console.log("hhhhhhh");
    })
    const [userData, setUserData] = useState(null)

const {admin}=useAuthContext();
    useEffect(() => {

        const userId = data?.members?.find((id) => id !== currentUser)
            console.log(userId,'888888888888888');
        const getUser = async()=>{
            const response=await axios.get(`/vendor/vendorchat/${userId}`,{headers: {
                Authorization: `${admin.token}`,
              }})
              console.log(response,'000000000000000');
            setUserData(response.data.data[0])
        }
        getUser();
    },[data,currentUser])
  
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
                        <span className="text-xl font-bold break-all">{userData?.name ? userData?.name : userData?.email}</span>
                        <span style={{ color: online ? "#51e200" : "" }}>{online ? "Online" : "Offline"}</span>
                    </div>
                </div>
            </div>
            <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
        </>
    );
};

export default CoversationAdmin;