import Bell from '@/assets/bell.svg';
import User from '@/assets/user.svg';
// import Calendar from '@/assets/calendar.svg';
import DollarSign from '@/assets/dollar-sign.svg';
import Home from '@/assets/home.svg';
// import MapPin from '@/assets/map-pin.svg';
import PlusSquare from '@/assets/plus-square.svg';
import Settings from '@/assets/settings.svg';
// import Users from '@/assets/users.svg';

const NavButton = ({ image, imageAlt, styles }) => {
  return (
    <button
      className={`${styles} hover:bg-gray-100 hover:cursor-pointer hover:rounded-2xl pr-2.5 pl-2.5 h-min`}
    >
      <img src={image} alt={imageAlt} />
    </button>
  );
};

const NavigationWrapper = ({ children }) => {
  return (
    <div className="grid h-full grid-rows-[50px_1fr_50px]">
      <nav className="flex gap-5 p-2.5 bg-gray-200 items-center">
        <NavButton image={User} imageAlt="profile" styles="mr-auto" />
        <NavButton image={Bell} imageAlt="reminders" />
        <NavButton image={Settings} imageAlt="settings" />
      </nav>
      <main className="pt-2.5 pb-2.5 pr-5 pl-5">{children}</main>
      <nav className="flex gap-5 p-2.5 justify-center bg-gray-200 items-center">
        <NavButton image={Home} imageAlt="home" />
        <NavButton image={PlusSquare} imageAlt="new" />
        <NavButton image={DollarSign} imageAlt="expenses" />
      </nav>
    </div>
  );
};

export default NavigationWrapper;
