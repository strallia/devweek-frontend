import Image from '@/components/Image';
import { useNavigate } from 'react-router-dom';
import DateTime from './DateTime';
import GroupName from './GroupName';
import DefaultImage from './DefaultImage';
import ProfileImage from './ProfileImage';

const EventItem = ({ item }) => {
  const { eventImage, groupImage, groupName, eventName, date, location } = item;
  const navigate = useNavigate();

  const goToEventPage = () => {
    navigate('/event', { state: item });
  };

  const goToGroupPage = (e) => {
    e.stopPropagation();
    navigate('/group');
  };

  return (
    <div
      className="flex gap-2.5 items-center cursor-pointer"
      onClick={goToEventPage}
    >
      <div className="h-24 w-24 rounded-md overflow-hidden">
        <Image url={eventImage} tailwindHeight="h-24" />
      </div>
      <div>
        <GroupName
          groupName={groupName}
          image={groupImage}
          onClick={goToGroupPage}
        />
        <p className="text-xl">{eventName}</p>
        <DateTime date={date} />
        <p className="text-xs">{location}</p>
      </div>
    </div>
  );
};

const GroupItem = ({ item }) => {
  const { group_icon, group_name, users, description } = item;
  const navigate = useNavigate();

  const usersFirstLetter = users.map((user) => user.username.charAt(0));

  const goToGroupPage = () => {
    navigate('/group', { state: item });
  };

  return (
    <div className="flex gap-2.5 cursor-pointer" onClick={goToGroupPage}>
      <div className="h-24 w-24 rounded-md overflow-hidden">
        {group_icon ? <Image url={group_icon} /> : <DefaultImage />}
      </div>
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
        <p className="text-2xl">{group_name}</p>
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
            <li key={index} className="p-3">
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
