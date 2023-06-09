import React, { useState } from 'react'
import userRegister from '../../assets/userRegister.jpg';
import logo from '../../assets/logo.jpg';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { toast } from "react-toastify";
import Otp from './Otp';


function UserRegister() {
    const navigate = useNavigate()
    axios.defaults.withCredentials = true;
    const [Inpval, setInpval] = useState({
        name: "",
        email: "",
        mobile: "",
        password: "",
        cpassword: ""
    });
    const [showOtp, setShowOtp] = useState(false)


    const addUserdata = async (e) => {
        e.preventDefault();

        try {
            axios.post('http://localhost:5000/signup', {
                ...Inpval
            }).then((data) => {
                console.log(data.data);
                if (!data.data.err) {
                    console.log(Inpval);
                    setShowOtp(true)
                }
            })


        } catch (err) {


        }
    };


    return (
        !showOtp ?
<div style={{ backgroundImage: `url(${userRegister})` ,backgroundSize:"cover" }}>
            <div className='grid grid-cols-1 sm:grid-cols-2 h-screen w-full'>
                <div className="hidden sm:block h-full">
</div>


                <div className='flex flex-col justify-center'>
                    <img className='w-40 h-40 mx-auto object-cover' src={logo} />
                    <form className='max-w-[400px] w-full mx-auto bg-gray-200 p-8 px-8 rounded-lg'>
                        <h2 className='text-4xl dark:text-white font-bold text-center'>REGISTER HERE</h2>
                        <div className='flex flex-col py-2'>
                            <label>Name</label>
                            <input className='rounded-lg' type="text" onChange={(e) => setInpval({ ...Inpval, [e.target.name]: e.target.value })} name='name' />
                        </div>
                        <div className='flex flex-col py-2'>
                            <label>Email</label>
                            <input className='rounded-lg' type="email" onChange={(e) => setInpval({ ...Inpval, [e.target.name]: e.target.value })} name='email' />
                        </div>
                        <div className='flex flex-col py-2'>
                            <label>Mobile</label>
                            <input className='rounded-lg' type="text" onChange={(e) => setInpval({ ...Inpval, [e.target.name]: e.target.value })} name='mobile' />
                        </div>
                        <div className='flex flex-col py-2'>
                            <label>Password</label>
                            <input className='rounded-lg' type="password" onChange={(e) => setInpval({ ...Inpval, [e.target.name]: e.target.value })} name='password' />
                        </div>
                        <div className='flex flex-col py-2'>
                            <label>confirm Password</label>
                            <input className='rounded-lg' type="password" onChange={(e) => setInpval({ ...Inpval, [e.target.name]: e.target.value })} name='cpassword' />
                        </div>
                        <button type="submit" className='bg-black text-white font-bold py-2 px-4 rounded' onClick={addUserdata}>REGISTER</button>
                    </form>

                </div>

            </div>
            </div>
            : <Otp data={{ ...Inpval, vendor: false }} />
    )
}

export default UserRegister