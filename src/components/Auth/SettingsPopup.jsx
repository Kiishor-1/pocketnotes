import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import { logout } from '../../store/userSlice'; // Import your logout action

const SettingsPopup = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogout = () => {
    dispatch(logout()); // Dispatch logout action
    navigate('/'); // Redirect to login page or home page
    onClose(); // Close the popup
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[5] backdrop-filter backdrop-brightness-25">
      <div className="bg-white p-4 border rounded shadow-lg w-64">
        <h2 className="text-lg font-bold mb-4">Are you sure ?</h2>
        <button
          onClick={handleLogout}
          className="w-full mb-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer"
        >
          Log Out
        </button>
        <button
          onClick={onClose}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer"
        >
          Close
        </button>
      </div>
      <div
        className="fixed inset-0 bg-black opacity-0 z-[-1]"
        onClick={onClose}
      ></div>
    </div>
  );
};

export default SettingsPopup;
