import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMessages, sendMessage } from '../../store/messageSlice';
import { fetchGroup, joinGroup } from '../../store/groupSlice'; // Import joinGroup thunk
import { useParams } from 'react-router-dom';
import { IoMdSend } from "react-icons/io";
import { IoMdLock } from 'react-icons/io';

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

  useEffect(() => {
    if (groupId) {
      dispatch(fetchMessages(groupId));
      dispatch(fetchGroup(groupId));
    }
  }, [dispatch, groupId]);

  useEffect(() => {
    if (group && user && Array.isArray(group.members)) {
      const memberObject = group.members.find(member => member.userId === user._id);
      setIsUserMember(Boolean(memberObject));
    }
  }, [group, user]);

  const handleSendMessage = () => {
    if (messageContent.trim()) {
      dispatch(sendMessage({ groupId, userId: user._id, content: messageContent }));
      setMessageContent('');
    }
  };

  const handleJoinGroup = () => {
    dispatch(joinGroup({ groupId, token: token })); // Use the joinGroup thunk with groupId and token
  };


  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  };

  // Helper function to format times without seconds
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-col h-screen w-full p-4 bg-[#DAE5F5] justify-between">
      <div className="flex-shrink-0 p-2 border-b border-white">
        <h2 className="text-xl font-semibold px-3">{groupName}</h2>
      </div>
      <div className="flex-1 overflow-y-auto p-2">
        {messages.length > 0 ? (
          messages.map((message, index) => {
            const messageDate = formatDate(message.timestamp);
            const previousMessageDate = index > 0 ? formatDate(messages[index - 1].timestamp) : null;
            const isNewDate = messageDate !== previousMessageDate;
            const isUserMessage = message.sender?._id === user._id;
            console.log("send id ",message.sender._id);
            console.log("current user id",user._id);

            return (
              <div key={message._id}>
                {isNewDate && (
                  <div className="chat-date text-center text-gray-500 my-2">
                    {messageDate}
                  </div>
                )}
                <div
                  className={`chat-message p-2 mb-2 rounded flex ${isUserMessage ? 'justify-end' : 'justify-start'
                    }`}
                >
                  <div
                    className={`flex flex-col max-w-xs ${isUserMessage ? 'items-end' : 'items-start'
                      }`}
                  >
                    <span className={`username font-bold ${isUserMessage ? 'text-right' : ''}`}>
                      {message.sender?.username}
                    </span>
                    <p className={`message ${isUserMessage ? 'bg-blue-500 text-white' : 'bg-gray-200'} p-2 rounded`}>
                      {message.content}
                    </p>
                    <span className={`timestamp text-gray-500 text-sm ${isUserMessage ? 'text-right' : ''}`}>
                      {formatTime(message.timestamp)}
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
      <p className="flex items-center self-center opacity-30 text-sm">
        <IoMdLock />
        end-to-end encrypted
      </p>
      {isUserMember ? (
        <div className="p-2 border-t flex items-center">
          <input
            type="text"
            value={messageContent}
            onChange={(e) => setMessageContent(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 border p-2 rounded"
          />
          <button
            onClick={handleSendMessage}
            disabled={messageContent.length <= 0}
            className={`ml-2 ${messageContent.length > 0 ? 'bg-blue-500' : 'bg-blue-200'} text-white px-4 py-2 rounded`}
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




