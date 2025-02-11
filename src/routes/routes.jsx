import NavigationWrapper from '../layouts/NavigationWrapper';
import Chat from '../pages/Chat';
import Chats from '../pages/Chats';
import ErrorPage from '../pages/ErrorPage';
import Event from '../pages/Event';
import EventExpense from '../pages/EventExpense';
import Expenses from '../pages/Expenses';
import Group from '../pages/Group';
import Home from '../pages/Home';
import Landing from '../pages/Landing';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import ProtectedRoutes from './ProtectedRoutes';
import Profile from '../pages/Profile';

const routes = [
  { path: '/', element: <Landing /> },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <Signup /> },
  {
    element: <ProtectedRoutes />,
    children: [
      {
        element: <NavigationWrapper />,
        children: [
          { path: '/home', element: <Home /> },
          { path: '/group', element: <Group /> },
          { path: '/event', element: <Event /> },
          { path: '/expenses', element: <Expenses /> },
          { path: '/chats', element: <Chats /> },
          { path: '/chat', element: <Chat /> },
          { path: '/eventExpense', element: <EventExpense /> },
          { path: '/profile', element: <Profile /> },
        ],
      },
    ],
  },
  { path: '*', element: <ErrorPage /> },
];

export default routes;
