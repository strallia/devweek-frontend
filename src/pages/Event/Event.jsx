import DateTime from '../../components/DateTime';
import { useLocation } from 'react-router-dom';
import GroupName from '../../components/GroupName';
import DefaultImage from '../../components/DefaultImage';
import ProfileImage from '../../components/ProfileImage';
import PersonPlus from '@/assets/icons/person-plus.svg';
import MapPin from '@/assets/icons/map-pin.svg';
import IconButton from '../../components/IconButton';
import ChatBubble from '@/assets/icons/chat-bubble.svg';
import Wallet from '@/assets/icons/wallet.svg';
import ScrollableWrapper from '../../layouts/ScrollableWrapper';

const Event = () => {
  const { state } = useLocation();
  const { groupName, eventName, date, location, image, users, description } =
    state;

  const handleJoinEvent = () => {
    console.log('joined event');
  };

  return (
    <>
      <section className="relative">
        <div className="h-60">
          <DefaultImage />
        </div>
        <div className="absolute bottom-0 flex justify-between w-full px-3 pb-3">
          <div className="grid gap-1.5">
            <h1 className="font-bold text-2xl">{eventName}</h1>
            <GroupName groupName={groupName} />
          </div>
          <DateTime date={date} containerStyles="mt-auto" />
        </div>
      </section>
      <ScrollableWrapper height="calc(100vh - 60px - 240px - 80px)">
        <section className="grid gap-3 py-2.5 px-5">
          <div className="flex justify-between">
            <div className="grid grid-rows-[auto_auto] grid-cols-[1fr_auto]">
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
              <button
                onClick={handleJoinEvent}
                className="col-start-2 col-end-3 flex justify-center items-center w-[30px] h-[30px]"
              >
                <img src={PersonPlus} alt="join event" className="" />
              </button>
              <p className="text-xs col-start-1 col-end-3 row-start-2 row-end-3">
                {users.length} going
              </p>
            </div>
            <div className="flex gap-2">
              <IconButton
                image={ChatBubble}
                text="Chat"
                tailwindStyles="w-[80px] h-[60px] py-1 text-xs bg-gray-100 rounded-md gap-0 hover:bg-gray-300"
              />
              <IconButton
                image={Wallet}
                text="Expenses"
                tailwindStyles="w-[80px] h-[60px] py-1 text-xs bg-gray-100 rounded-md hover:bg-gray-300"
              />
            </div>
          </div>
          <div className="border-b border-gray-300 pb-2.5">
            <div className="flex gap-1.5 items-center">
              <img src={MapPin} alt="" className="h-4" />
              <p>{location}</p>
            </div>
            (google maps goes here)
          </div>
          <div className="border-b border-gray-300 pb-2.5">
            <h3 className="font-bold">About Event</h3>
            <p className="text-sm">{description}</p>
          </div>
        </section>
      </ScrollableWrapper>
    </>
  );
};

export default Event;
