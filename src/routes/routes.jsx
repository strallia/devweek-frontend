import ErrorPage from './ErrorPage';
import Home from '../components/Home/Home';

const routes = [
  {
    path: '/',
    element: <Home />,
    errorElement: <ErrorPage />,
  },
];

export default routes;
