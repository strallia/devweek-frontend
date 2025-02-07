import NavigationWrapper from '@/layouts/NavigationWrapper';
import List from './List';

const events = [
  {
    groupName: 'Group Name',
    eventName: 'Event Name',
    date: new Date(),
    location: 'san jose, CA',
  },
  {
    groupName: 'Group Name',
    eventName: 'Event Name',
    date: new Date(),
    location: 'san jose, CA',
  },
];

const groups = [
  {
    groupName: 'Group Name',
    users: ['Sam Johnson', 'Josie Rein', 'Jane Doe', 'Sellie Nosh'],
    description: 'description',
  },
  {
    groupName: 'Group Name',
    users: ['Sam Johnson', 'Josie Rein', 'Jane Doe'],
    description: 'description',
  },
];

function Home() {
  return (
    <NavigationWrapper>
      <List title="Your Events" items={events} type="events" />
      <List title="Your Groups" items={groups} type="groups" />
    </NavigationWrapper>
  );
}

export default Home;
