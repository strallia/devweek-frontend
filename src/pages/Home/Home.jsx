import NavigationWrapper from '@/layouts/NavigationWrapper';
import List from './List';
import { events, groups } from '@/utils/mockData';

function Home() {
  return (
    <NavigationWrapper>
      <List title="Your Events" items={events} type="events" />
      <List title="Your Groups" items={groups} type="groups" />
    </NavigationWrapper>
  );
}

export default Home;
