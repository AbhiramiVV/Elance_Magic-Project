import React, { useEffect, useState } from 'react'
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ForgotOTPModal from '../Component/ForgotOTPModal';
import axios from '../instance/axios'
import { useAuthContext } from '../Hooks/useAuthContext';
import forg from '../assets/forgot.gif'

const ChangePassword = () => {
  const {user}=useAuthContext;

  const { userId, token } = useParams();

  const [password, setPassword] = useState("");
  const [repassword,setrePassword] =useState("")
  const [errMsg, setErrMsg] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordType, setPasswordType] = useState("password");
  const navigate = useNavigate();

  useEffect(() => {
    setErrMsg("");
  }, [password]);


  const passwordTypeChange = () => {
    if (!passwordVisible) {
      setPasswordVisible(true);
      setPasswordType("text");
    } else {
      setPasswordVisible(false);
      setPasswordType("password");
    }
  };


  const submitHandler = async () => {

    if (password.length < 8) {
      setErrMsg("password must greater 8 character ");
      return;
    }
    try {
      const response = await axios.post("/changePassword", {
      password,repassword
          
      });
      console.log(response)
      if(response.status==200){
        navigate('/login')
      }
      
    } catch (error) {
      if (error.response.status === 400) {
        setErrMsg("session expires ");
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
        <h1 className='text-3xl font-semibold font-sans'>Enter new password</h1>
        <input onChange={(e) => { setPassword(e.target.value) }} type={passwordType} name='password' value={password} placeholder='Password' className='w-[90%] h-20 mt-10 text-3xl border-2 border-black rounded-3xl text-center' />
        <p className="relative w-full ">
          <i className="absolute right-10 bottom-6 bg-white z-10 pl-2" onClick={passwordTypeChange}>
            {passwordVisible ? (
              <FiEye size={38} opacity={0.6} />
            ) : (
              <FiEyeOff size={38} opacity={0.6} />
            )}
          </i>
        </p>
        {<p className="text-red-500">{errMsg}</p>}
        <h1 className='text-3xl font-semibold font-sans'>Re enter Password</h1>
        <input onChange={(e) => { setrePassword(e.target.value) }} type={passwordType} name='password' value={repassword} placeholder='Password' className='w-[90%] h-20 mt-10 text-3xl border-2 border-black rounded-3xl text-center' />
        <p className="relative w-full ">
          <i className="absolute right-10 bottom-6 bg-white z-10 pl-2" onClick={passwordTypeChange}>
            {passwordVisible ? (
              <FiEye size={38} opacity={0.6} />
            ) : (
              <FiEyeOff size={38} opacity={0.6} />
            )}
          </i>
        </p>
        {<p className="text-red-500">{errMsg}</p>}
        

        <button onClick={submitHandler} className='w-[60%] h-20 mt-10 text-3xl font-semibold border-2 border-black rounded-3xl text-center hover:scale-105 hover:bg-black hover:text-white'>Save</button>

        {/* <Link to={'/login'} className='mt-3 underline font-semibold text-gray-600'>Cancel?</Link> */}

      </div>
      <div className='hidden md:flex items-center flex-col md:col-span-3 lg:col-span-2 '>
        <img src={forg} alt="LOGIN" className='w-[90%]' />
        {/* <h1 className='font-Viaoda text-7xl text-gray-500 absolute top-2/3'>Make everything easy</h1> */}
      </div>

    </div>
  )
}

export default ChangePassword
