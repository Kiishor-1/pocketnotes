import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { requestOTP, verifyOTP, registerUser } from '../../store/userSlice';
import toast from 'react-hot-toast';
import { CgSpinner } from 'react-icons/cg';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { setUpRecaptcha } from '../../firebase.config';
import OTPInput from 'otp-input-react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField } from '@mui/material';

const OTPLogin = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [name, setName] = useState('');
  const dispatch = useDispatch();
  const { confirmationResult, user, loading, phoneNumber: storedPhoneNumber } = useSelector(state => state.user);

  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [navigate, user])

  useEffect(() => {
    setUpRecaptcha('recaptcha-container');
  }, []);

  const handleRequestOTP = async () => {
    try {
      await dispatch(requestOTP(phoneNumber)).unwrap();
      toast.success('OTP sent successfully');
    } catch (error) {
      toast.error('Failed to send OTP');
    }
  };

  const handleVerifyOTP = async () => {
    try {
      const res = await dispatch(verifyOTP({ confirmationResult, otp, navigate })).unwrap();
      // console.log("result is ",res);
      toast.success('OTP verified successfully');
    } catch (error) {
      toast.error('Failed to verify OTP');
    }
  };

  const handleRegisterUser = async () => {
    try {
      await dispatch(registerUser({ name, mobileNumber: storedPhoneNumber, navigate })).unwrap();
      toast.success('User registered successfully');
    } catch (error) {
      toast.error('Failed to register user');
    }
  };

  return (
    <div className="otp-login bg-[#DAE5F5] shadow-xl flex items-center justify-center h-full w-full lg:h-[80vh] lg:w-[80%] lg:top-[10vh] lg:right-[10vw] lg:bottom-[10vh] lg:left-[10vw] absolute">
      <div id="recaptcha-container"></div>
      {!user && !confirmationResult && (
        <div className='flex flex-col items-center gap-3'>
          <label htmlFor="" className='font-semibold'>Enter Your Number</label>
          <PhoneInput
            country={'in'}
            type="text"
            placeholder="Enter Phone Number"
            value={phoneNumber}
            onChange={(phoneNumber)=>setPhoneNumber('+' + phoneNumber)}
          />
          <button onClick={handleRequestOTP} disabled={loading} className='bg-emerald-600 w-full flex gap-1 justify-center py-2.5 text-white rounded'>
            {loading ? <CgSpinner size={20} className='mt-1 animate-spin' /> : 'Request OTP'}
            <span>Send code via SMS</span>
          </button>
        </div>
      )}

      {confirmationResult && !user && (
        <div className='flex flex-col items-center gap-4'>
          <OTPInput
            OTPLength={6}
            otpType="number"
            disabled={false}
            autoFocus
            // className="otp-container flex justify-between"
            value={otp}
            onChange={setOtp}
            inputClassName="w-[3rem] h-[3rem] text-center border-2 border-gray-300 rounded-md bg-gray-100 focus:border-blue-500 focus:outline-none"
          />
          <button onClick={handleVerifyOTP} disabled={loading} className='bg-emerald-900 p-2 rounded-md text-white'>
            {loading ? <CgSpinner className="spinner" /> : 'Verify OTP'}
          </button>
        </div>
      )}

      {user && !user.username && (
        <div className='flex items-center gap-4 flex-col'>        
          <TextField
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="standard-basic"
            label="Enter Name"
            variant="standard" 
          />
          <Button onClick={handleRegisterUser} disabled={loading} variant='outlined'>
          {loading ? <CgSpinner className="spinner" /> : 'Register User'}
          </Button>
        </div>
      )}
    </div>
  );
};

export default OTPLogin;
