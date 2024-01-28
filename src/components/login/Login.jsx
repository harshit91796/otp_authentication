import React, { useRef, useState } from 'react';
import { CircularProgress } from '@mui/material';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { toast, Toaster } from 'react-hot-toast';
import auth from '../Firebase.js';
import './login.css';
import OtpInput from "otp-input-react";
import { useNavigate } from 'react-router-dom';
// import {six,seven} from '../util.js';
import six from '../../assets/six.jpg'
import seven from '../../assets/seven.png'

function Login() {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showOTP, setShowOTP] = useState(false);
  const [user, setUser] = useState(null);
  const otpInputRef = useRef();
  
  const navigate = useNavigate();

  const onCaptchVerify = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth, 'recaptcha-container',
        {
          size: 'invisible',
          callback: (response) => {
            onSignup();
          },
          'expired-callback': () => {},
        },
      );
    }
  };

  const handleOtpInputChange = (otp) => {
    setOtp(otp);
    // Additional logic if needed
  };

 

  const onSignup = () => {
    setLoading(true);
    onCaptchVerify();

    const appVerifier = window.recaptchaVerifier;
    const formattedPhoneNumber = `+${phoneNumber}`;

    signInWithPhoneNumber(auth, formattedPhoneNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShowOTP(true);
        toast.success('OTP sent successfully!');
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
        toast.error('Failed to send OTP. Please try again.');
      });
  };

  function onOTPVerify(otp) {
    setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        console.log(res);
        setUser(res.user);
        setLoading(false);
        navigate('/success');
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }

  const handleOtpSubmit = () => {
    // Handle OTP submission

    // if(user){
    //   navigate('/success');
    // }else{
    //   toast.error('Failed to login. Please try again.');
    // }
    console.log(otp);
    onOTPVerify(otp);
    // Use confirmationResult.confirm(otp) here
    
  };

  return (
    <div className='loginContainer'>
     <img className='loginImg' src={seven} />
      <Toaster toastOptions={{ duration: 4000 }} />
      <div className="login">
        <div className="loginLeft">
        <div className="imgDiv">
                 <img className='loginImg' src={six} />
             </div>
          <div className="login-form">
            <div className='form-input'>
            <label htmlFor="phone" className='form-label'>Enter Phone </label>
            <PhoneInput className="form-input" value={phoneNumber} onChange={setPhoneNumber} country={'in'} />

            <div id="recaptcha-container"></div>

            <div className="action-btn">
              <button className="btn-login" onClick={onSignup} disabled={loading}>
                {loading ? <CircularProgress size={20} /> : 'Send OTP'}
              </button>
            </div>
            </div>

            {showOTP && (
              <div className='form-input'>
              <label htmlFor="phone" className='form-label'>Enter OTP </label>
                <OtpInput
                value={otp}
                onChange={setOtp}
                OTPLength={6}
                otpType="number"
                disabled={false}
                autoFocus
                className="opt-container "
                  // onChange={(e) => handleOtpInputChange(e.target.value)}
                 
                />
                <button className="btn-login" onClick={handleOtpSubmit}>Verify OTP</button>
               
              </div>
            )}


          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
