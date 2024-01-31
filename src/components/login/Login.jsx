import React, { useRef, useState } from 'react';
import { CircularProgress } from '@mui/material';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
// import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { toast, Toaster } from 'react-hot-toast';
// import auth from '../Firebase.js';
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
  const [verificationFailed, setVerificationFailed] = useState(false);
  
  const navigate = useNavigate();
  const sendOtp = async () => {
    setLoading(true);
   console.log(phoneNumber)
    try {
      const response = await fetch('http://localhost:3000/loginOtp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber: `+${phoneNumber}` }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data); // Assuming the server sends a response like { success: true }
        setShowOTP(true);
        toast.success('OTP sent successfully!');
      } else {
        toast.error('Failed to send OTP. Please try again.');
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async () => {
    setLoading(true);
  
    try {
      const response = await fetch('http://localhost:3000/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ otp: otp, phoneNumber: `+${phoneNumber}` }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        if (data.success && data.status === 'approved') {
          setLoading(false);
          navigate('/success');
        } else {
          setLoading(false);
          toast.error('Failed to verify OTP. Please try again.');
          setOtp('');
          setVerificationFailed(true);
        }
      } else {
        setLoading(false);
        
        toast.error('Failed to verify OTP. Please try again.');
        setVerificationFailed(true);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
      toast.error('Failed to verify OTP. Please try again.');
      setVerificationFailed(true);
    }
  };
  

  return (
    <div className='loginContainer'>
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

              <div className="action-btn">
                <button className="btn-login" onClick={sendOtp} disabled={loading}>
                  {loading ? <CircularProgress size={20} /> : 'Send OTP'}
                </button>
              </div>
            </div>

            {showOTP && (
              <div className='form-input'>
                <label htmlFor="phone" className='form-label'>Enter OTP </label>
                <OtpInput
                
                value={verificationFailed ? otp : otp}
                  onChange={setOtp}
                  OTPLength={6}
                  otpType="number"
                  disabled={false}
                  autoFocus
                  className="opt-container"
                  inputStyle={{ color: 'white' }}
                />
                <button className="btn-login" onClick={handleOtpSubmit}>{loading ? <CircularProgress size={20} /> : 'Verify OTP'}</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
