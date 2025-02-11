import { useState } from 'react';
import { fetchData } from '../utils/fetchData';

const Login = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const handleLogin = async () => {
    // authenticate user and get JWT from backend
    const response = await fetchData('http://127.0.0.1:5000/login', 'POST', {
      email,
      password,
    });
    localStorage.setItem('token', response.token);
  };

  return (
    <div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="grid h-[100vh] justify-center content-center gap-3 justify-items-center"
      >
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
          onClick={handleLogin}
          className="bg-gray-100 hover:bg-gray-200 w-min p-2"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
