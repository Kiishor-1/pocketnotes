import { useEffect } from 'react';
import OTPLogin from '../components/Auth/OTPLogin';
import { IoMdLock } from 'react-icons/io';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const Home = () => {
  const user = useSelector((state)=>state.user.user);
  const token = useSelector((state)=>state.user.token);
  const navigate = useNavigate();
  // useEffect(()=>{
  //   console.log('Home1')
  //   if(user ){
  //     navigate('/main');
  //   }
  // },[navigate, user])

    return (
      <div className="home-container h-screen flex flex-col items-center relative">
        <div className="h-[30vh] w-full bg-teal-700 ">
          <h2 className='text-2xl font-semibold p-4 lg:text-white z-[4000] absolute'>Pocket Notes</h2>
        </div>
        <div className="h-[70vh] w-full bg-gray-100 "></div>
        <OTPLogin />
        <p className="absolute bottom-[1rem] flex items-center">
              <IoMdLock />
              end-to-end encrypted
            </p>
      </div>
    );
  };
    

  
  
export default Home;

