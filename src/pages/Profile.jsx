import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate('/login');
  };
  return (
    <div>
      <button
        onClick={handleLogout}
        className="p-3 bg-gray-200 hover:bg-gray-300"
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;
