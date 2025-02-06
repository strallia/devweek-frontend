import Bell from '@/assets/bell.svg';
import User from '@/assets/user.svg';
import Calendar from '@/assets/calendar.svg';
import DollarSign from '@/assets/dollar-sign.svg';
import Home from '@/assets/home.svg';
import PlusSquare from '@/assets/plus-square.svg';
import Users from '@/assets/users.svg';
import Writing from '@/assets/writing.svg';
import AddSubtract from '@/assets/add-subtract.svg';
import { useState } from 'react';

const NavButton = ({ image, imageAlt, styles, onClick, text }) => {
  return (
    <button
      className={`hover:bg-gray-100 hover:cursor-pointer hover:rounded-2xl px-2.5 h-min flex justify-center ${styles}`}
      onClick={onClick}
    >
      <img src={image} alt={imageAlt} />
      {text}
    </button>
  );
};

const NavigationWrapper = ({ children }) => {
  const [showCreateItemDropdown, setShowCreateItemDropdown] = useState(false);

  const toggleCreateItemDropdown = () => {
    setShowCreateItemDropdown((prev) => !prev);
  };

  return (
    <div className="grid h-full grid-rows-[50px_1fr_50px]">
      <nav className="flex gap-5 p-2.5 bg-gray-200 items-center relative">
        <NavButton image={User} imageAlt="profile" styles="mr-auto" />
        <NavButton image={Bell} imageAlt="reminders" />
        <NavButton
          image={Writing}
          imageAlt="create expense, event, or group"
          onClick={toggleCreateItemDropdown}
        />
        {showCreateItemDropdown ? (
          <div className="absolute right-3 top-[120%] grid gap-1">
            <NavButton
              image={AddSubtract}
              imageAlt="add expense"
              text="Add Expense"
              styles="py-[12px] px-[16px]"
            />
            <NavButton
              image={Calendar}
              imageAlt="create event"
              text="Create Event"
              styles="py-[12px] px-[16px]"
            />
            <NavButton
              image={Users}
              imageAlt="create group"
              text="Create Group"
              styles="py-[12px] px-[16px]"
            />
          </div>
        ) : null}
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
