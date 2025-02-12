import ScrollableWrapper from '../layouts/ScrollableWrapper';
import CalendarSmall from '@/assets/icons/calendar-sm.svg';
import AddSubtract from '@/assets/icons/add-subtract.svg';
import Avatar from '@/assets/icons/avatar.svg';
import DefaultImage from '@/assets/icons/default-image.svg';
import { expenses } from '@/utils/mockData';


// Helper function for ordinal dates
const getOrdinal = (n) => {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v-20)%10] || s[v] || s[0]);
};

const TransactionItem = ({ expense }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = getOrdinal(date.getDate());
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    return `${day} - ${month} - ${year}`;
  };

  const colorClass = expense.type === 'owe' ? 'text-red-500' : 'text-green-500';
  const buttonText = expense.type === 'owe' ? 'Paid' : 'Received';

  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm mb-4">
      {/* Person Section */}
      <div className="flex flex-col items-center w-20">
        <img 
          src={expense.personImage || Avatar} 
          alt="Person" 
          className="w-12 h-12 rounded-full object-cover mb-2"
        />
        <span className="text-xs text-center text-gray-600">{expense.personName}</span>
      </div>

      {/* Event Info */}
      <div className="flex-1 mx-4">
        <div className="mb-1">
          <div className="flex items-center gap-2">
            <img 
              src={expense.eventImage || DefaultImage} 
              alt="Event" 
              className="w-4 h-4 rounded-sm"
            />
            <span className="text-sm text-gray-800">{expense.eventName}</span>
          </div>
          <p className="text-base font-bold text-gray-900">{expense.description}</p>
        </div>
        
        <div className="flex items-center text-sm text-gray-500">
          <img src={CalendarSmall} alt="Calendar" className="w-3 h-3 mr-1" />
          {formatDate(expense.date)}
        </div>
      </div>

      {/* Amount & Action */}
      <div className="text-right">
        <div className={`text-lg font-semibold ${colorClass}`}>
          ${expense.amount.toFixed(2)}
        </div>
        <button 
          onClick={() => console.log('Marking expense:', expense.id)}
          className="mt-2 px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

const YourExpenses = () => {
  const sortedTransactions = [...expenses].sort((a, b) => 
    new Date(b.date) - new Date(a.date)
  );

  return (
    <ScrollableWrapper height="calc(100vh - 60px - 80px)">
      <div className="p-5">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Your Expenses</h1>
        </div>
        
        {/* Recent Transactions Header */}
        <div >
          <h2 className="text-gray-900 font-medium">Recent Transactions</h2>
        </div>

        {/* Transactions List */}
        <div className="space-y-4">
          {sortedTransactions.map((expense) => (
            <TransactionItem key={expense.id} expense={expense} />
          ))}
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-[100px] left-1/2 transform -translate-x-1/2 z-10">
        <button className="flex items-center bg-blue-500 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-600 transition-all">
          <img src={AddSubtract} alt="Add" className="w-6 h-6 mr-2" />
          Add Expense
        </button>
      </div>
    </ScrollableWrapper>
  );
};

export default YourExpenses;