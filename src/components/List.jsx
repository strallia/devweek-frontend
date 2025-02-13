import Image from '@/components/Image';
import { useNavigate } from 'react-router-dom';
import DateTime from './DateTime';
import MapPin from '@/assets/icons/map-pin.svg';
import GroupName from './GroupName';
import DefaultImage from './DefaultImage';
import ProfileImage from './ProfileImage';

const EventItem = ({ item }) => {
  const { event_icon, group, event_name, date, location, id } = item;
  const navigate = useNavigate();

  const goToEventPage = () => {
    navigate('/event', { state: { event_id: id } });
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
        <Image url={event_icon} tailwindHeight="h-24" />
      </div>
      <div>
        <GroupName
          groupName={group.group_name}
          image={group.group_icon}
          // onClick={goToGroupPage}
        />
        <p className="text-xl">{event_name}</p>
        <DateTime date={date} />
        <div className="text-xs flex items-center gap-1.5">
          <img src={MapPin} alt="" className="w-3" />
          {location}
        </div>
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
