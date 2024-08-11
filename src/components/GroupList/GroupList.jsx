import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGroups } from '../../store/groupSlice';
import GroupCard from './GroupCard';
import SettingsPopup from '../Auth/SettingsPopup'; // Import the SettingsPopup component
import { IoMdSettings } from "react-icons/io";

const GroupList = ({ setChatStarted, setShowChat, showChat }) => {
  const dispatch = useDispatch();
  const { list: groups, status, error } = useSelector((state) => state.group);

  const [isPopupOpen, setIsPopupOpen] = useState(false); // State for managing the popup

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchGroups());
    }
  }, [status, dispatch]);

  if (status === 'failed') return <div>{error}</div>;

  const handleBack = () => {
    setShowChat(false);
  };

  const handleSettingsClick = () => {
    setIsPopupOpen(true); // Open the popup
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false); // Close the popup
  };

  return (
    <div className='bg-white h-screen  overflow-scroll hide-scrollbar'>
      <h2 className='sticky top-0 bg-white text-center text-3xl font-semibold py-6'>
        Pocket Notes
      </h2>
      <button
        onClick={handleSettingsClick}
        className="absolute text-2xl top-7 right-4 text-blue-600"
      >
        <IoMdSettings />
      </button>
      <div>
        {groups.map((group) => (
          <GroupCard
            setChatStarted={setChatStarted}
            setShowChat={setShowChat}
            key={group._id}
            group={group}
          />
        ))}
      </div>
      {showChat && (
        <button onClick={handleBack} className="absolute top-4 left-4 text-blue-600">
          Back to Groups
        </button>
      )}
      {/* Render the SettingsPopup component */}
      <SettingsPopup isOpen={isPopupOpen} onClose={handlePopupClose} />
    </div>
  );
};

export default GroupList;
