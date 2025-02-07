import Chat from '../pages/Chat/Chat';
import Chats from '../pages/Chats/Chats';
import ErrorPage from '../pages/Error/ErrorPage';
import Event from '../pages/Event/Event';
import EventExpense from '../pages/EventExpense/EventExpense';
import Expenses from '../pages/Expenses/Expenses';
import Group from '../pages/Group/Group';
import Home from '../pages/Home/Home';

const routes = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/group',
    element: <Group />,
  },
  {
    path: '/event',
    element: <Event />,
  },
  {
    path: '/expenses',
    element: <Expenses />,
  },
  {
    path: '/chats',
    element: <Chats />,
  },
  {
    path: '/chat',
    element: <Chat />,
  },
  {
    path: '/eventExpense',
    element: <EventExpense />,
  },
  {
    path: '*',
    element: <ErrorPage />,
  },
];

export default routes;
