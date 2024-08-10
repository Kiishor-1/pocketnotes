import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import GroupList from "../components/GroupList/GroupList";
import { BiPlus } from "react-icons/bi";
import CreateModal from "../components/Common/CreateModal";
import { Outlet, useNavigate } from 'react-router-dom';
import { createGroup } from '../store/groupSlice';
import { useDispatch } from 'react-redux';
import Lobby from '../components/Common/Lobby';
import { BiArrowBack } from "react-icons/bi";

export default function Main() {
  const [modalOpen, setModalOpen] = useState(false);
  const [chatStarted, setChatStarted] = useState(
    localStorage.getItem('chatStarted') === 'true'
  );
  const [showChat, setShowChat] = useState(false); // Controls chat visibility on small screens

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  useEffect(() => {
    localStorage.setItem('chatStarted', chatStarted);
  }, [chatStarted]);

  const handleCreateGroup = (groupData) => {
    dispatch(createGroup(groupData)); 
    setModalOpen(false);
  };

  const handleBackToChatList = () => {
    setShowChat(false); // Show chat list when the back button is clicked
  };

  return (
    <div className="h-full bg-[#DAE5F5] flex">
      {/* Back Button on smaller screens */}
      {showChat && (
        <button
          onClick={handleBackToChatList}
          className="absolute z-[2] top-7 left-2 text-2xl text-blue-600 xl:hidden" // Visible only on small screens
        >
          <BiArrowBack />
        </button>
      )}

      <div className={`w-full ${showChat ? 'hidden' : 'block'} xl:w-[22vw] md:w-[40%] sm:w-full relative border xl:block`}>
        <GroupList setChatStarted={setChatStarted} setShowChat={setShowChat} />
        <BiPlus
          onClick={() => setModalOpen(true)}
          className='absolute cursor-pointer bottom-[3rem] right-[2rem] bg-blue-900 text-white text-3xl font-semibold h-[3rem] w-[3rem] rounded-full flex items-center justify-center'
        />
      </div>
      
      <div className={`flex flex-[1] flex-col items-center justify-center gap-4 relative ${showChat ? 'block' : 'hidden sm:block sm:flex'}`}>
        <Outlet />
        {!chatStarted && <Lobby />} {/* Lobby is only shown when chat hasn't started */}
      </div>

      {modalOpen && <CreateModal onCreate={handleCreateGroup} onClose={() => setModalOpen(false)} />}
    </div>
  );
}


