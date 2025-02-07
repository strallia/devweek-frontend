import Bell from '@/assets/icons/bell.svg';
import User from '@/assets/icons/user.svg';
import Calendar from '@/assets/icons/calendar.svg';
import DollarSign from '@/assets/icons/dollar-sign.svg';
import Home from '@/assets/icons/home.svg';
import PlusSquare from '@/assets/icons/plus-square.svg';
import Users from '@/assets/icons/users.svg';
import Writing from '@/assets/icons/writing.svg';
import AddSubtract from '@/assets/icons/add-subtract.svg';
import { useState } from 'react';
import AddExpense from '../components/AddExpense';
import AddEvent from '../components/AddEvent';
import AddGroup from '../components/AddGroup';

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
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [showEventForm, setShowEventForm] = useState(false);
  const [showGroupForm, setShowGroupForm] = useState(false);

  const toggleCreateItemDropdown = () => {
    setShowCreateItemDropdown((prev) => !prev);
  };

  const toggleExpenseForm = () => {
    toggleCreateItemDropdown();
    setShowExpenseForm((prev) => !prev);
  };

  const toggleEventForm = () => {
    toggleCreateItemDropdown();
    setShowEventForm((prev) => !prev);
  };

  const toggleGroupForm = () => {
    toggleCreateItemDropdown();
    setShowGroupForm((prev) => !prev);
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
              onClick={toggleExpenseForm}
            />
            <NavButton
              image={Calendar}
              imageAlt="create event"
              text="Create Event"
              styles="py-[12px] px-[16px]"
              onClick={toggleEventForm}
            />
            <NavButton
              image={Users}
              imageAlt="create group"
              text="Create Group"
              styles="py-[12px] px-[16px]"
              onClick={toggleGroupForm}
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

      <AddExpense
        isVisible={showExpenseForm}
        setIsVisible={setShowExpenseForm}
      />
      <AddEvent isVisible={showEventForm} setIsVisible={setShowEventForm} />
      <AddGroup isVisible={showGroupForm} setIsVisible={setShowGroupForm} />
    </div>
  );
};

export default NavigationWrapper;
