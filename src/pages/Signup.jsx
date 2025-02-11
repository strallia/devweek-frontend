import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser, loginUser } from '../utils/authentication';

const Signup = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const handleSignup = async () => {
    try {
      await createUser(username, email, password);
      await loginUser(email, password);
      navigate('/home');
    } catch (err) {
      setError(err);
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
