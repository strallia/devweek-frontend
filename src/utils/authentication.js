import { fetchData } from './fetchData';

export const loginUser = async (email, password) => {
  // authenticate user and get JWT from backend
  try {
    const response = await fetchData('http://127.0.0.1:5000/login', 'POST', {
      email,
      password,
    });
    localStorage.setItem('token', response.token);
    return response;
  } catch (err) {
    console.error('Login failed:', err.message);
    throw err;
  }
};

export const createUser = async (username, email, password) => {
  try {
    return await fetchData('http://127.0.0.1:5000/users', 'POST', {
      username,
      email,
      password,
    });
  } catch (err) {
    console.error('Signup failed', err);
    throw err;
  }
};
