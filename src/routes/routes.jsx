import ErrorPage from '../pages/Error/ErrorPage';
import Home from '../pages/Home/Home';

const routes = [
  {
    path: '/',
    element: <Home />,
    errorElement: <ErrorPage />,
  },
];

export default routes;
