import { useLocation } from 'react-router-dom';
import IconButton from '../components/IconButton';
import Image from '../components/Image';
import PersonPlus from '@/assets/icons/person-plus.svg';
import ProfileImage from '../components/ProfileImage';
import ScrollableWrapper from '../layouts/ScrollableWrapper';
import List from '../components/List';

const Group = () => {
  const { state } = useLocation();
  const { group_name, users, description, group_icon, events } = state;

  return (
    <>
      <section className="relative">
        <Image url={null} tailwindHeight="h-52" />
        <div className="absolute bottom-0 flex justify-between w-full px-3 pb-3">
          <div className="flex gap-1.5 w-full items-center">
            <h1 className="font-bold text-2xl">{group_name}</h1>
            <div className="grid ml-auto">
              <div className="flex">
                {users.map((user, index) => (
                  <div
                    key={index}
                    className="w-8 h-8"
                    style={{
                      marginLeft: index === 0 ? 0 : `-12px`,
                    }}
                  >
                    <ProfileImage
                      image={user.image}
                      text={user.username.charAt(0)}
                    />
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-400 ml-auto">
                {users.length} members
              </p>
            </div>
          </div>
        </div>
      </section>
      <ScrollableWrapper height="calc(100vh - 60px - 80px - 208px)">
        <div className="grid grid-rows-[repeat(4, auto)] py-3.5 px-5 gap-6">
          <IconButton
            image={PersonPlus}
            text="Add Member"
            isHorizontal={true}
            tailwindStyles="w-min h-[40px] py-1 px-8 text-sm bg-[#B4DBFF] rounded-full gap-0 hover:bg-gray-300 gap-1.5 justify-center text-nowrap"
          />
          <div>
            <h3 className="font-bold">About Group</h3>
            <p className="text-sm min-h-[70px]">{description}</p>
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
    </>
  );
};

export default Group;
