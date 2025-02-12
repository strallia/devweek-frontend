import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // TODO: handle token expiration
      // let tokenExpiration = jwtDecode(token).exp;
      // let dateNow = new Date();

      // if (tokenExpiration < dateNow.getTime() / 1000) {
      //   setIsAuthenticated(false);
      // } else {
      setIsAuthenticated(true);
      // }
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  if (isAuthenticated === null) {
    return <></>;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoutes;
