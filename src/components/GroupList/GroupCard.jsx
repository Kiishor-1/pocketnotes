import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { GROUP_ENDPOINTS } from '../../services/api';

const { GROUP_MEMBERS } = GROUP_ENDPOINTS;

const GroupCard = ({ group, setChatStarted, setShowChat }) => {
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const [isMember, setIsMember] = useState(false);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get(GROUP_MEMBERS(group._id));
        const members = response.data;
        if (Array.isArray(members)) {
          const member = members.find((member) => member.userId === user?._id);
          setIsMember(!!member);
        } else {
          console.error('Unexpected response format:', members);
        }
      } catch (error) {
        console.error('Error fetching members:', error);
      }
    };

    if (user) {
      fetchMembers();
    }
  }, [group._id, user]);

  const handleButtonClick = () => {
    setChatStarted(true);
    setShowChat(true);
    navigate(`/main/groups/${group._id}/chat`);
  };

  return (
    <div className="flex items-center gap-4 my-6 cursor-pointer" onClick={handleButtonClick}>
      <div className="flex justify-center">
        <div
          className={`rounded-full h-[4rem] border-4 border-gray-300 overflow-hidden w-[4rem] ml-3 bg-${group.groupBackground}`}
        >
          <img
            src={`https://ui-avatars.com/api/?background=${group.groupBackground}&color=fff&name=${group.name}`}
            alt={group.name}
            className="rounded-full text-blue-900 bg-blue-900"
          />
        </div>
      </div>
      <div className="font-semibold flex-[1]">
        {group.name}
      </div>
    </div>
  );
};

export default GroupCard;


