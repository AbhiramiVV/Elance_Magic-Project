
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import side from "../../assets/login.gif";
import ForgotOTPModal from '../../Component/ForgotOTPModal';
import axios from '../../instance/axios'

const Forgotpassword = () => {

    const [phone, setPhone] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const [Optmodal, setOtpmodal] = useState(false)
    const addServiceClose = () => setOtpmodal(false);

    const submitHandler = async () => {
      
        try {
            const response = await axios.post("/forgotPassword", {
                 phone,
            });
            setOtpmodal(true)
        } catch (error) {
            if (error.response.status === 400) {
                setErrMsg("No user with this mobile number");
                return;
            }
            if (error.response.status === 500) {
                setErrMsg("Server error try after some time ");
                return;
            }

        }
    }

    return (
        <div className='w-full h-[1007px] grid lg:grid-cols-3 md:grid-cols-5 bg-white'>
            <div className='md:col-span-2 lg:col-span-1 flex flex-col items-center justify-center'>
                <h1 className='text-3xl font-semibold font-sans'>Enter your Email Address</h1>
                <input onChange={(e) => { setPhone(e.target.value) }} type="email" name='email' value={phone} placeholder='Email' className='w-[90%] h-20 mt-10 text-3xl border-2 border-black rounded-3xl text-center' />
                <p className="text-red-500">{errMsg}</p>

                <button onClick={submitHandler} className='w-[60%] h-20 mt-10 text-3xl font-semibold border-2 border-black rounded-3xl text-center hover:scale-105 hover:bg-black hover:text-white'>Send OTP</button>

                <Link to={'/login'} className='mt-3 underline font-semibold text-gray-600'>Cancel?</Link>

            </div>
            <div className='hidden md:flex items-center flex-col md:col-span-3 lg:col-span-2'>
                <img src={side} alt="LOGIN" className='w-[100%]' />
                <h1 className='font-Viaoda text-7xl text-gray-500 absolute top-2/3'>Simplify everything for your convenience.</h1>
            </div>
            <ForgotOTPModal onClose={addServiceClose} visible={Optmodal} phone={phone} />

        </div>
    )
}

export default Forgotpassword
