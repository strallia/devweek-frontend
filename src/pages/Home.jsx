import ScrollableWrapper from '../layouts/ScrollableWrapper';
import List from '../components/List';
import { events, groups } from '@/utils/mockData';

function Home() {
  return (
    <ScrollableWrapper height="calc(100vh - 60px - 80px)">
      <div className="py-2.5 px-5">
        <List title="Your Events" items={events} type="events" />
        <List title="Your Groups" items={groups} type="groups" />
      </div>
    </ScrollableWrapper>
  );
}

export default Home;
