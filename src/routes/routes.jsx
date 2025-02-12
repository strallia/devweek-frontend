import NavigationWrapper from '../layouts/NavigationWrapper';
import Chat from '../pages/Chat';
import Chats from '../pages/Chats';
import ErrorPage from '../pages/ErrorPage';
import Event from '../pages/Event';
import EventExpense from '../pages/EventExpense';
import YourExpenses from '../pages/YourExpenses';
import Expenses from '../pages/Expenses';
import Group from '../pages/Group';
import Home from '../pages/Home';

const routes = [
  {
    path: '/',
    element: <NavigationWrapper />,
    children: [
      {
        path: '',
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
        path: '/yourExpenses',
        element: <YourExpenses />,
      },
      {
        path: '*',
        element: <ErrorPage />,
      },
    ],
  },
];

export default routes;
