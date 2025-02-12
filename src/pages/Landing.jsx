import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();

  const goToPage = (route) => {
    navigate(route);
  };

  return (
    <div className="grid justify-center justify-items-center h-full content-center gap-3">
      <h1>Welcome!</h1>
      <button
        className="bg-gray-200 p-2 rounded-md hover:bg-gray-300"
        onClick={() => goToPage('/login')}
      >
        Login
      </button>
      <button
        className="bg-gray-200 p-2 rounded-md hover:bg-gray-300"
        onClick={() => goToPage('/signup')}
      >
        Signup
      </button>
    </div>
  );
};

export default Landing;
