import React, { useState } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import OtpInput from 'react18-input-otp';
import axios from '../instance/axios';
import Countdown, { zeroPad } from 'react-countdown';

const renderer = ({ minutes, seconds }) => (
  <span className="text-xl text-right">
    {zeroPad(minutes)}:{zeroPad(seconds)}
  </span>
);

const ForgotOTPModal = ({ visible, onClose, phone }) => {
  const navigate = useNavigate();

  const [otp, setOtp] = useState('');
  const [error, setError] = useState(false);
  const [resend, setResend] = useState(false);

  const handleOnClose = (e) => {
    if (e.target.id === 'container') onClose();
  };

  const resendHandler = () => {
    setResend(true);
  };

  const handleChange = (enteredOtp) => {
    setOtp(enteredOtp);
  };

  const otpSentButtonHandler = async () => {
    if (otp.length < 4) {
      setError(true);
    } else {
      setError(false);

      const data = { mobile: phone, otp: otp };
      try {
        const response = await axios.post('/ChangePasswordOtp', data);
        if (response.status === 201) {
          const token = response.data.passwordToken;
          const userId = response.data.userId;
          navigate(`/changePassword/${userId}/${token}`);
        } else {
          setError(true);
        }
      } catch (error) {
        alert('Server failed');
      }
    }
  };

  const otpResendHandler = async () => {
    const data = { mobile: phone };
    try {
      const response = await axios.post('/resendOtp', data);
      if (response.status === 201) {
        setResend(false);
      } else {
        setError(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (!visible) return null;

  return (
    <div
      id="container"
      onClick={handleOnClose}
      className="z-10 fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center"
    >
      <div className="bg-white w-[500px] h-[500px] flex flex-col rounded-3xl m-2">
        <div className="flex flex-row-reverse text-4xl p-4 border-b-2 border-black">
          <button onClick={onClose}>
            <AiFillCloseCircle />
          </button>
        </div>
        <div className="h-full w-full flex items-center justify-center flex-col">
          <h1 className="text-3xl font-medium mb-8">Enter OTP</h1>
          <p>OTP was sent to +91 {phone}</p>
          <OtpInput
            value={otp}
            onChange={handleChange}
            separator={<span className="p-4 shadow-2xl"> </span>}
            inputStyle="md:text-7xl text-4xl shadow-2xl border-2 rounded-xl"
            numInputs={4}
            isInputNum={true}
          />
          {error && <p className="text-red-600 text-xl pt-5">Invalid OTP</p>}
          <div className="w-full flex justify-end p-10">
            {!resend && (
              <Countdown
                date={Date.now() + 100000}
                renderer={renderer}
                onComplete={resendHandler}
                className="text-xl text-right w-[65%] mt-5"
              />
            )}
            {resend && (
              <p
                className="text-xl text-right w-[65%] cursor-pointer underline mt-5"
                onClick={otpResendHandler}
              >
                Resend OTP?
              </p>
            )}
          </div>
          <button
            onClick={otpSentButtonHandler}
            className="bg-green-500 hover:bg-green-600 rounded-3xl h-16 w-[60%] text-lg font-medium mt-6 p-4 uppercase"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotOTPModal;
