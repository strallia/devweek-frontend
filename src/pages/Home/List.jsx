import moment from 'moment';
import Image from '@/components/Image';
import { useNavigate } from 'react-router-dom';
import ProfileImage from '../../components/ProfileImage';

const EventItem = ({ item }) => {
  const { eventImage, groupImage, groupName, eventName, date, location } = item;
  const navigate = useNavigate();

  const formattedDate = moment(date).format('MMM D, YYYY / h:mm a');

  const goToEventPage = () => {
    navigate('/event');
  };

  const goToGroupPage = (e) => {
    e.stopPropagation();
    navigate('/group');
  };

  return (
    <div className="flex gap-2.5" onClick={goToEventPage}>
      <Image url={eventImage} size="med" />
      <div>
        <button className="flex gap-1.5 items-center" onClick={goToGroupPage}>
          <Image url={groupImage} size="small" />
          {groupName}
        </button>
        <p className="text-xl">{eventName}</p>
        <p className="text-xs">{formattedDate}</p>
        <p className="text-xs">{location}</p>
      </div>
    </div>
  );
};

const GroupItem = ({ item }) => {
  const { groupImage, groupName, users, description } = item;
  const navigate = useNavigate();

  const usersFirstLetter = users.map((user) => user.charAt(0));

  const goToGroupPage = () => {
    navigate('/group');
  };

  return (
    <div className="flex gap-2.5" onClick={goToGroupPage}>
      <Image url={groupImage} size="med" />
      <div className="grid justify-between">
        <div className="flex">
          {users.map((user, index) => (
            <div
              key={index}
              className="w-8 h-8"
              style={{ transform: `translateX(${-40 * index}%)` }}
            >
              <ProfileImage image={user.image} text={usersFirstLetter[index]} />
            </div>
          ))}
        </div>
        <p className="text-2xl">{groupName}</p>
        <p className="text-xs">{description}</p>
      </div>
    </div>
  );
};

const List = ({ title, items, type }) => {
  return (
    <div>
      <h1 className="font-bold border-b border-gray-300 p-2">{title}</h1>
      <ul>
        {items.map((item, index) => {
          return (
            <li key={index} className="bg-red p-3">
              {type === 'events' ? (
                <EventItem item={item} />
              ) : (
                <GroupItem item={item} />
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default List;
