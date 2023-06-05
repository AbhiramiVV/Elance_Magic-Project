import React, { useEffect, useState } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import axios from '../../instance/axios';
import { toast } from 'react-toastify';

function Otp(props) {
  console.log(props);

  const [timer, setTimer] = useState(60);
  const navigate=useNavigate()
  const[OTP,setOTP]=useState("");
  const location=useLocation()
  const data=location.state;
  const [resendAttempts, setResendAttempts] = useState(0);

  useEffect(() => {
    let intervalId;

    if (timer > 0) {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [timer]);

function otphandle(OTP){
  setOTP(OTP.target.value);

}
const handleResendOTP = () => {
  if (resendAttempts < 3) {
    setResendAttempts((prevAttempts) => prevAttempts + 1);
    setTimer(60);
    axios.post('/resendOtp', {data,props }).then((response) => {
      console.log(response.data);
    });
  }
};
const verify=async(e)=>{
  e.preventDefault();
  try {
    if(!props.data.vendor){

      await axios.post("/otp",{
        OTP,...props.data
      }).then(()=>{
        
          toast.success("Registerd successfully")
          navigate('/login')
         
       
      })
    }else{
      await axios.post("/vendor/otp",{
        OTP,...props.data
      }).then(()=>{
        
          toast.success("Registerd successfully")
          navigate('/vendor/vendor')
         
       
      })
      
    }
  } catch (error) {
    
  }
}

  return (
  <>

<div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
  <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
    <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
      <div className="flex flex-col items-center justify-center text-center space-y-2">
        <div className="font-semibold text-3xl">
          <p>Mobile OTP Verification</p>
        </div>
        <div className="flex flex-row text-sm font-medium text-gray-400">
          <p>We have sent a code to your registered mobile number</p>
        </div>
      </div>

      <div>
     
<input
  type="text"
  id="otp-input"
  className="w-full px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300"
  value={OTP}
  onChange={otphandle}
  placeholder="Enter OTP here"
/>

<button className="w-full mt-5 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" type='submit' onClick={verify}>
  Verify OTP
</button>
              {timer === 0 && resendAttempts < 3 && (
                <button
                  type="submit"
                  className="resend-btn"
                  style={{ color: 'read' }}
                  onClick={handleResendOTP}
                >
                  Resend OTP
                </button>
              )}
              {timer > 0 && (
                <p className="timer timer-style">Resend OTP in {timer} s</p>
              )}
              {resendAttempts >= 3 && (
                <p className="error-msg">Maximum resend attempts reached</p>
              )}


      </div>
    </div>
  </div>
</div>
    </>
  )
}

export default Otp