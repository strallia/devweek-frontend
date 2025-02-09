import { useLocation } from 'react-router-dom';
import IconButton from '../../components/IconButton';
import Image from '../../components/Image';
import Plus from '@/assets/icons/plus.svg';
import ProfileImage from '../../components/ProfileImage';
import ScrollableWrapper from '../../layouts/ScrollableWrapper';
import List from '../Home/List';

const Group = () => {
  const { state } = useLocation();
  const { groupName, users, description, image, events } = state;

  return (
    <ScrollableWrapper height="calc(100vh - 60px - 80px)">
      <div className="grid grid-rows-[repeat(4, auto)] p-2.5 gap-6">
        <div className="flex items-center gap-3">
          <div className="rounded-full overflow-hidden">
            <Image url={image} />
          </div>
          <h1 className="text-2xl font-bold mr-auto">{groupName}</h1>
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
                <ProfileImage image={user.image} text={user.charAt(0)} />
              </div>
            ))}
          </div>
          <p className="text-xs">{users.length} members</p>
        </div>
        <div>
          <h3 className="font-bold">About Group</h3>
          <p className="text-sm">{description}</p>
        </div>
        <List title="Upcoming Events" items={events} type="events" />
      </div>
    </ScrollableWrapper>
  );
};

export default Group;
