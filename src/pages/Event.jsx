import DateTime from '../components/DateTime';
import { useLocation } from 'react-router-dom';
import GroupName from '../components/GroupName';
import ProfileImage from '../components/ProfileImage';
import PersonPlus from '@/assets/icons/person-plus.svg';
import MapPin from '@/assets/icons/map-pin.svg';
import IconButton from '../components/IconButton';
import ChatBubble from '@/assets/icons/chat-bubble.svg';
import Wallet from '@/assets/icons/wallet.svg';
import ScrollableWrapper from '../layouts/ScrollableWrapper';
import Image from '../components/Image';
import { useEffect, useState } from 'react';
import { fetchData } from '../utils/fetchData';

const Event = () => {
  const { state } = useLocation();
  const { event_id } = state;
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const getEventData = async () => {
      const data = await fetchData(`http://127.0.0.1:5000/events/${event_id}`);
      setEvent(data);
    };
    getEventData();
  }, [event_id]);

  const handleJoinEvent = () => {
    console.log('joined event');
  };

  if (!event) {
    return <></>;
  }

  return (
    <>
      <section className="relative">
        <Image url={event.event_icon} tailwindHeight="h-52" />
        <div className="absolute bottom-0 flex justify-between w-full px-3 pb-3">
          <div className="grid gap-1.5">
            <h1 className="font-bold text-2xl">{event.event_name}</h1>
            <DateTime date={event.date} containerStyles="mt-auto" />
          </div>
          <div className="flex justify-between">
            <div className="grid grid-rows-[auto_auto] grid-cols-[1fr_auto]">
              <div className="flex ">
                {event.users.map((user, index) => (
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
              <p className="text-xs col-start-1 col-end-3 row-start-2 row-end-3 ml-auto text-gray-400">
                {event.users.length} going
              </p>
            </div>
          </div>
        </div>
      </section>
      <ScrollableWrapper height="calc(100vh - 60px - 208px - 80px)">
        <section className="grid gap-6 py-3.5 px-5">
          <div className="pointer-events-none">
            <GroupName groupName={event.group_name} />
          </div>
          <div className="flex gap-2">
            <IconButton
              image={ChatBubble}
              text="Chat"
              isHorizontal={true}
              tailwindStyles="w-min h-[40px] py-1 px-8 text-sm bg-[#B4DBFF] rounded-full gap-0 hover:bg-gray-300 gap-1.5 justify-center text-nowrap"
            />
            <IconButton
              image={Wallet}
              text="Expenses"
              isHorizontal={true}
              tailwindStyles="w-min h-[40px] py-1 px-8 text-sm bg-[#B4DBFF] rounded-full gap-0 hover:bg-gray-300 gap-1.5 justify-center text-nowrap"
            />
            <IconButton
              image={PersonPlus}
              text="Invite"
              isHorizontal={true}
              tailwindStyles="w-min h-[40px] py-1 px-8 text-sm bg-[#B4DBFF] rounded-full gap-0 hover:bg-gray-300 gap-1.5 justify-center text-nowrap"
            />
          </div>
          <div className="border-b border-gray-300 pb-2.5">
            <div className="flex gap-1.5 items-center">
              <img src={MapPin} alt="" className="h-4" />
              <p>{event.location}</p>
            </div>
          </div>
          <div className="border-b border-gray-300 pb-2.5">
            <h3 className="font-bold">About Event</h3>
            <p className="text-sm">{event.description}</p>
          </div>
        </section>
      </ScrollableWrapper>
    </>
  );
};

export default Event;
