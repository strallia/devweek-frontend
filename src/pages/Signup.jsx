import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchData } from '../utils/fetchData';

const Signup = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const handleSignup = async () => {
    try {
      // create user in db
      await fetchData('http://127.0.0.1:5000/users', 'POST', {
        username,
        email,
        password,
      });

      // automatically login user
      const data = await fetchData('http://127.0.0.1:5000/login', 'POST', {
        email,
        password,
      });
      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data.user.id);
      navigate('/home');
    } catch (err) {
      setError(err.message);
    }
  };

  if (error) {
    return <p>Error signing up: {error}</p>;
  }

  return (
    <div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="grid h-[100vh] justify-center content-center gap-3 justify-items-center"
      >
        <label htmlFor="username">
          Username
          <input
            type="username"
            id="username"
            name="username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            className="border border-gray-200"
          />
        </label>
        <label htmlFor="email">
          Email
          <input
            type="email"
            id="email"
            name="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="border border-gray-200"
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            type="password"
            id="password"
            name="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="border border-gray-200"
          />
        </label>
        <button
          type="submit"
          onClick={handleSignup}
          className="bg-gray-100 hover:bg-gray-200 w-min p-2"
        >
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;
