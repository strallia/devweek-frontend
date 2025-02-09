import List from './List';
import { events, groups } from '@/utils/mockData';

function Home() {
  return (
    <div className="py-2.5 px-5">
      <List title="Your Events" items={events} type="events" />
      <List title="Your Groups" items={groups} type="groups" />
    </div>
  );
}

export default Home;
