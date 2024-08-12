import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMessages, sendMessage } from '../../store/messageSlice';
import { fetchGroup, joinGroup } from '../../store/groupSlice'; // Import joinGroup thunk
import { useParams } from 'react-router-dom';
import { IoMdSend } from "react-icons/io";
import { IoMdLock } from 'react-icons/io';
import TimeDateLabel from './TimeDateLabel';

const UserChat = () => {
  const dispatch = useDispatch();
  const { groupId } = useParams(); // Extract groupId from URL
  const { user, token } = useSelector((state) => state.user);

  const messagesState = useSelector((state) => state.messages);
  const groupState = useSelector((state) => state.group);

  const messages = messagesState?.messages || [];
  const status = messagesState?.status || 'idle';
  const error = messagesState?.error || null;

  const group = groupState?.group || {};
  const groupName = group?.name || 'Group';

  const [messageContent, setMessageContent] = useState('');
  const [isUserMember, setIsUserMember] = useState(false);
  const [shouldFetchMessages, setShouldFetchMessages] = useState(false);

  useEffect(() => {
    if (groupId) {
      dispatch(fetchMessages(groupId));
      dispatch(fetchGroup(groupId));
    }
  }, [dispatch, groupId]);

  useEffect(() => {
    if (shouldFetchMessages && groupId) {
      dispatch(fetchMessages(groupId));
      dispatch(fetchGroup(groupId));
      setShouldFetchMessages(false); // Reset the trigger
    }
  }, [dispatch, groupId, shouldFetchMessages]);

  useEffect(() => {
    if (group && user && Array.isArray(group.members)) {
      const memberObject = group.members.find(member => member.userId === user._id);
      setIsUserMember(Boolean(memberObject));
    }
  }, [group, user]);

  const handleSendMessage = () => {
    if (messageContent.trim()) {
      dispatch(sendMessage({ groupId, userId: user._id, content: messageContent })).then(() => {
        setShouldFetchMessages(true); // Trigger message fetching after sending a message
      });
      setMessageContent('');
    }
  };

  const handleJoinGroup = () => {
    dispatch(joinGroup({ groupId, token: token }))
      .then(() => {
        setIsUserMember(true); // Directly update isUserMember after joining
        dispatch(fetchGroup(groupId)); // Re-fetch the group to ensure the state is updated
      });
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  };

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-col h-screen w-full p bg-[#DAE5F5] justify-between">
      <div className="flex-shrink-0 pl-10 py-3 border-b border-white text-white bg-blue-900 flex items-center gap-3">
        <img
          src={`https://ui-avatars.com/api/?background=${group.groupBackground}&color=fff&name=${groupName}`}
          alt="group-icon"
          className='rounded-full'
        />
        <h2 className="text-xl font-semibold px-3">{groupName}</h2>
      </div>
      <div className="flex-1 overflow-y-auto p-4 hide-scrollbar">
        {messages.length > 0 ? (
          messages.map((message, index) => {
            const messageDate = formatDate(message.timestamp);
            const previousMessageDate = index > 0 ? formatDate(messages[index - 1].timestamp) : null;
            const isNewDate = messageDate !== previousMessageDate;
            const isUserMessage = message.sender?._id === user._id;

            return (
              <div key={message._id} className="mb-2">
                {isNewDate && (
                  <div className="chat-date text-center text-gray-500 my-2">
                    {messageDate}
                  </div>
                )}
                <div
                  className={`chat-message p-2 rounded ${isUserMessage ? 'ml-auto' : 'mr-auto'} bg-white shadow-md max-w-full sm:max-w-[fit-content]`}
                >
                  <div className={`flex flex-col ${isUserMessage ? 'items-end' : 'items-start'}`}>
                    <span className={`username font-bold ${isUserMessage ? 'text-right' : ''}`}>
                      {message.sender?.username}
                    </span>
                    <p className="message p-2 rounded">
                      {message.content}
                    </p>
                    <span className={`timestamp mt-3 text-gray-500 text-sm ${isUserMessage ? 'text-right' : ''}`}>
                      <TimeDateLabel timestamp={message.timestamp} />
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div>No messages</div>
        )}
      </div>
      <p className="flex items-center self-center opacity-30 text-sm py-2">
        <IoMdLock />
        end-to-end encrypted
      </p>
      {isUserMember ? (
        <div className="p-2 border-t flex items-center bg-blue-900">
          <textarea
            type="text"
            value={messageContent}
            onChange={(e) => setMessageContent(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 border p-2 rounded"
          />
          <button
            onClick={handleSendMessage}
            disabled={messageContent.length <= 0}
            className={`ml-2 ${messageContent.length > 0 ? 'bg-blue-900 block' : 'hidden'} text-white px-4 py-2 rounded`}
          >
            <IoMdSend />
          </button>
        </div>
      ) : (
        <div className="p-2 border-t flex items-center justify-center">
          <button
            onClick={handleJoinGroup}
            className="bg-blue-200 opacity-80 px-4 py-2 w-full rounded"
          >
            Join the Group
          </button>
        </div>
      )}
    </div>
  );
};

export default UserChat;
