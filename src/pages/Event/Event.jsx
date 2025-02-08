import NavigationWrapper from '../../layouts/NavigationWrapper';
import DateTime from '../../components/DateTime';
import { useLocation } from 'react-router-dom';
import GroupName from '../../components/GroupName';
import DefaultImage from '../../components/DefaultImage';

const Event = () => {
  const { state } = useLocation();
  const { groupName, eventName, date, location, image, members, description } =
    state;

  return (
    <NavigationWrapper>
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
      <section></section>
    </NavigationWrapper>
  );
};

export default Event;
