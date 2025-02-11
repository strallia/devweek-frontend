import Bell from '@/assets/icons/bell.svg';
import User from '@/assets/icons/user.svg';
import CalendarLarge from '@/assets/icons/calendar-lg.svg';
import ChatBubbles from '@/assets/icons/chat-bubbles.svg';
import Home from '@/assets/icons/home.svg';
import Wallet from '@/assets/icons/wallet.svg';
import Users from '@/assets/icons/users.svg';
import Writing from '@/assets/icons/writing.svg';
import AddSubtract from '@/assets/icons/add-subtract.svg';
import { useState } from 'react';
import AddExpense from '../components/AddExpense';
import AddEvent from '../components/AddEvent';
import AddGroup from '../components/AddGroup';
import IconButton from '../components/IconButton';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

const NavigationWrapper = () => {
  const navigate = useNavigate();
  const location = useLocation();
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

  const goToPage = (route) => {
    if (location.pathname === route) return;
    navigate(route);
  };

  return (
    <div className="grid h-full grid-rows-[60px_1fr_80px]">
      <nav className="flex gap-5 p-2.5 border-b border-gray-300 items-center relative">
        <IconButton image={User} imageAlt="profile" tailwindStyles="mr-auto" />
        <IconButton image={Bell} imageAlt="reminders" />
        <IconButton
          image={Writing}
          imageAlt="create expense, event, or group"
          onClick={toggleCreateItemDropdown}
        />
        {showCreateItemDropdown ? (
          <div className="absolute right-3 top-[120%] grid gap-1 z-1">
            <IconButton
              image={AddSubtract}
              imageAlt="add expense"
              text="Add Expense"
              tailwindStyles="py-[12px] px-[16px]"
              onClick={toggleExpenseForm}
              isHorizontal={true}
            />
            <IconButton
              image={CalendarLarge}
              imageAlt="create event"
              text="Create Event"
              tailwindStyles="py-[12px] px-[16px]"
              onClick={toggleEventForm}
              isHorizontal={true}
            />
            <IconButton
              image={Users}
              imageAlt="create group"
              text="Create Group"
              tailwindStyles="py-[12px] px-[16px]"
              onClick={toggleGroupForm}
              isHorizontal={true}
            />
          </div>
        ) : null}
      </nav>
      <main>
        <Outlet />
      </main>
      <nav className="flex gap-5 p-2.5 justify-center border-t border-gray-300 items-center">
        <IconButton
          image={Home}
          imageAlt="home"
          text="Home"
          onClick={() => goToPage('/home')}
        />
        <IconButton
          image={Wallet}
          imageAlt="wallet"
          text="Wallet"
          onClick={() => goToPage('/expenses')}
        />
        <IconButton
          image={ChatBubbles}
          imageAlt="chat"
          text="Chat"
          onClick={() => goToPage('/chats')}
        />
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
