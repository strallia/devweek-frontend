import moment from 'moment';
import Image from '../Image';

const EventItem = ({ item }) => {
  const { eventImage, groupImage, groupName, eventName, date, location } = item;

  const formattedDate = moment(date).format('MMM D, YYYY / h:mm a');

  return (
    <div className="flex gap-2.5">
      <Image url={eventImage} size="med" />
      <div>
        <div className="flex gap-1.5 items-center">
          <Image url={groupImage} size="small" />
          {groupName}
        </div>
        <p className="text-xl">{eventName}</p>
        <p className="text-xs">{formattedDate}</p>
        <p className="text-xs">{location}</p>
      </div>
    </div>
  );
};

const GroupItem = ({ item }) => {
  const { groupImage, groupName, users, description } = item;

  const usersFirstLetter = users.map((user) => user.charAt(0));

  const generateRandomPastelColor = () => {
    const r = Math.floor(Math.random() * 128) + 127;
    const g = Math.floor(Math.random() * 128) + 127;
    const b = Math.floor(Math.random() * 128) + 127;
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  };

  return (
    <div className="flex gap-2.5">
      <Image url={groupImage} size="med" />
      <div className="grid justify-between">
        <div className="flex">
          {users.map((user, index) => (
            <Image
              key={index}
              url={user.image}
              size="small"
              borderRadius="circle"
              containerStyles={{ transform: `translateX(${-40 * index}%)` }}
              imageStyles={{ backgroundColor: generateRandomPastelColor() }}
              imageText={usersFirstLetter[index]}
            />
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
      <h1 className="font-bold">{title}</h1>
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
