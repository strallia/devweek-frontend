const Image = ({ url, size }) => {
  const dimensions =
    size === 'small' ? '30px' : size === 'med' ? '100px' : '300px';

  return (
    <div
      className={`h-[${dimensions}] w-[${dimensions}] rounded-md overflow-hidden`}
    >
      {url ? (
        <img src={url} />
      ) : (
        <div className="bg-gray-200 h-full w-full"></div>
      )}
    </div>
  );
};

const EventItem = ({ item }) => {
  const { eventImage, groupImage, groupName, eventName, date, location } = item;

  return (
    <div className="flex gap-2.5">
      <Image url={eventImage} size="med" />
      <div>
        <div className="flex gap-1.5">
          <Image url={groupImage} size="small" />
          {groupName}
        </div>
        <p>{eventName}</p>
        <p>{date.toString()}</p>
        <p>{location}</p>
      </div>
    </div>
  );
};

const GroupItem = ({ item }) => {
  const { groupName, users, description } = item;
  return (
    <div>
      <p>{groupName}</p>
      <p>{users.join(', ')}</p>
      <p>{description}</p>
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
