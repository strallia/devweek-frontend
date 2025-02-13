import ScrollableWrapper from '../layouts/ScrollableWrapper';
import List from '../components/List';
import { useEffect, useState } from 'react';
import { fetchData } from '../utils/fetchData';

function Home() {
  const [groups, setGroups] = useState(null);
  const [events, setEvents] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const getGroups = async () => {
      const groupsData = await fetchData(
        `http://127.0.0.1:5000/users/${userId}/groups`,
        'GET',
      );
      const eventsData = await fetchData(
        `http://127.0.0.1:5000/users/${userId}/events`,
        'GET',
      );
      setEvents(eventsData.events);
      setGroups(groupsData.groups);
      setIsLoading(false);
    };
    getGroups();
  }, [userId]);

  if (isLoading) {
    return <></>;
  }

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
