import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGroups } from '../../store/groupSlice';
import GroupCard from './GroupCard';
import SettingsPopup from '../Auth/SettingsPopup';
import { IoMdSettings } from "react-icons/io";

const GroupList = ({ setChatStarted, setShowChat, showChat }) => {
  const dispatch = useDispatch();
  const { list: groups, isLoading, status, error } = useSelector((state) => state.group);

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchGroups());
    }
  }, [status, dispatch]);

  if (status === 'failed') return <div>{error}</div>;

  const renderSkeletonLoader = () => {
    return (
      <div className="w-full py-4 px-4 flex flex-col gap-4">
        {Array(5).fill().map((_, idx) => (
          <div key={idx} className="w-full h-16 rounded-lg bg-gray-200 animate-pulse"></div>
        ))}
      </div>
    );
  };

  const handleBack = () => {
    setShowChat(false);
  };

  const handleSettingsClick = () => {
    setIsPopupOpen(true);
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className='bg-white h-screen overflow-scroll hide-scrollbar'>
      <h2 className='sticky top-0 bg-white pl-6 text-3xl font-semibold py-6'>
        Pocket Notes
      </h2>
      <button
        onClick={handleSettingsClick}
        className="absolute text-2xl top-7 right-4 text-blue-600"
      >
        <IoMdSettings />
      </button>
      <div>
        {isLoading ? (
          renderSkeletonLoader()
        ) : (
          groups.map((group) => (
            <GroupCard
              setChatStarted={setChatStarted}
              setShowChat={setShowChat}
              key={group._id}
              group={group}
            />
          ))
        )}
      </div>
      {showChat && (
        <button onClick={handleBack} className="absolute top-4 left-4 text-blue-600">
          Back to Groups
        </button>
      )}
      <SettingsPopup isOpen={isPopupOpen} onClose={handlePopupClose} />
    </div>
  );
};

export default GroupList;
