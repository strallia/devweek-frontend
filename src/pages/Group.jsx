import { useLocation } from 'react-router-dom';
import IconButton from '../components/IconButton';
import Image from '../components/Image';
import Plus from '@/assets/icons/plus.svg';
import ProfileImage from '../components/ProfileImage';
import ScrollableWrapper from '../layouts/ScrollableWrapper';
import List from '../components/List';

const Group = () => {
  const { state } = useLocation();
  const { group_name, users, description, group_icon, events } = state;

  return (
    <ScrollableWrapper height="calc(100vh - 60px - 80px)">
      <div className="grid grid-rows-[repeat(4, auto)] p-2.5 gap-6">
        <div className="flex items-center gap-3">
          <div className="rounded-full overflow-hidden">
            <Image url={group_icon} />
          </div>
          <h1 className="text-2xl font-bold mr-auto">{group_name}</h1>
          <IconButton
            image={Plus}
            text="Add Members"
            isHorizontal={true}
            tailwindStyles="flex-row-reverse gap-2 border border-black rounded-full p-1"
          />
        </div>
        <div className="grid grid-rows-[min-content_min-content]">
          <div className="flex">
            {users.map((user, index) => (
              <div
                key={index}
                className="w-8 h-8"
                style={{ transform: `translateX(${-40 * index}%)` }}
              >
                <ProfileImage
                  image={user.image ? user.image : null}
                  text={user.username.charAt(0)}
                />
              </div>
            ))}
          </div>
          <p className="text-xs">{users.length} members</p>
        </div>
        <div>
          <h3 className="font-bold">About Group</h3>
          <p className="text-sm">{description}</p>
        </div>
        <div className="pointer-events-none">
          <List
            title="Upcoming Events"
            items={events.map((event) => {
              return { ...event, group: { group_icon, group_name } };
            })}
            type="events"
          />
        </div>
      </div>
    </ScrollableWrapper>
  );
};

export default Group;
