import { useState, useEffect } from 'react';
import ScrollableWrapper from '../layouts/ScrollableWrapper';
import ProfileImage from './ProfileImage';
import Writing from '@/assets/icons/write.svg';
import { events } from '@/utils/mockData';

const AddExpense = ({ isVisible, setIsVisible }) => {
  const [expenseName, setExpenseName] = useState('');
  const [expenseCost, setExpenseCost] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [paidBy, setPaidBy] = useState(null);
  const [splitMethod, setSplitMethod] = useState('equally');
  const [splitWith, setSplitWith] = useState([]);
  const [splitAmounts, setSplitAmounts] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  // Get logged in user (first user in event's users array)
  const getLoggedInUser = (users) => users[0];

  // Validation for split amounts sum with rounding tolerance
  const validateSplitAmounts = () => {
    if (splitMethod === 'equally') return true;

    const total = Object.values(splitAmounts).reduce((sum, val) => {
      const num = parseFloat(val) || 0;
      return sum + num;
    }, 0);

    if (splitMethod === 'exact') {
      const cost = parseFloat(expenseCost) || 0;
      return Math.abs(total - cost) < 0.01;
    }
    if (splitMethod === '%') {
      return Math.abs(total - 100) < 1;
    }
    return true;
  };

  // Main validation effect
  useEffect(() => {
    const basicValidation = !!(
      selectedEvent &&
      expenseName &&
      expenseCost &&
      paidBy &&
      splitWith.length > 0
    );

    const amountsValid = validateSplitAmounts();

    setIsFormValid(basicValidation && amountsValid);
  }, [
    selectedEvent,
    expenseName,
    expenseCost,
    paidBy,
    splitWith,
    splitAmounts,
    splitMethod,
  ]);

  // Reset all fields
  const resetAllFormFields = () => {
    setExpenseName('');
    setExpenseCost('');
    setSelectedEvent(null);
    setPaidBy(null);
    setSplitWith([]);
    setSplitAmounts({});
    setSplitMethod('equally');
  };

  // Handle event selection
  const handleEventChange = (newEvent) => {
    setSelectedEvent(newEvent);
    if (newEvent?.users?.length) {
      const loggedInUser = getLoggedInUser(newEvent.users);
      setPaidBy(loggedInUser);
      setSplitWith([]);
    }
  };

  // Calculate split amounts with percentage distribution
  useEffect(() => {
    if (!expenseCost || !paidBy) return;

    const allParticipants = [paidBy, ...splitWith];
    const costValue = parseFloat(expenseCost) || 0;

    if (splitMethod === 'equally') {
      const amount =
        allParticipants.length > 0
          ? (costValue / allParticipants.length).toFixed(2)
          : '0';
      const newAmounts = {};
      allParticipants.forEach((user) => {
        newAmounts[user] = amount;
      });
      setSplitAmounts(newAmounts);
    } else if (splitMethod === '%') {
      const totalPercent = 100;
      const count = allParticipants.length;
      const baseValue = (totalPercent / count).toFixed(2);
      const remainder = (totalPercent - baseValue * count).toFixed(2);

      const newAmounts = {};
      allParticipants.forEach((user, index) => {
        newAmounts[user] =
          index === allParticipants.length - 1
            ? (parseFloat(baseValue) + parseFloat(remainder)).toFixed(2)
            : baseValue;
      });
      setSplitAmounts(newAmounts);
    }
  }, [expenseCost, splitWith, splitMethod, paidBy]);

  // Reset exact amounts when method changes
  useEffect(() => {
    if (splitMethod === 'exact') {
      const newAmounts = {};
      const allParticipants = [paidBy, ...splitWith];
      allParticipants.forEach((user) => {
        newAmounts[user] = '';
      });
      setSplitAmounts(newAmounts);
    }
  }, [splitMethod, splitWith, paidBy]);

  // Handle amount changes
  const handleSplitAmountChange = (user, newValue) => {
    if (newValue === '') {
      setSplitAmounts((prev) => ({ ...prev, [user]: newValue }));
      return;
    }

    const parsedValue = parseFloat(newValue);
    const allParticipants = [paidBy, ...splitWith];

    if (splitMethod === 'exact') {
      const costValue = parseFloat(expenseCost) || 0;
      if (parsedValue > costValue) return;

      let total = parsedValue;
      allParticipants.forEach((u) => {
        if (u !== user) {
          total += parseFloat(splitAmounts[u]) || 0;
        }
      });
      if (total > costValue) return;
    } else if (splitMethod === '%') {
      if (parsedValue > 100) return;

      let total = parsedValue;
      allParticipants.forEach((u) => {
        if (u !== user) {
          total += parseFloat(splitAmounts[u]) || 0;
        }
      });
      if (total > 100) return;
    }

    setSplitAmounts((prev) => ({ ...prev, [user]: newValue }));
  };

  // Toggle split with users
  const handleSplitWithToggle = (userName) => {
    if (splitWith.includes(userName)) {
      setSplitWith((prev) => prev.filter((u) => u !== userName));
      setSplitAmounts((prev) => {
        const newAmounts = { ...prev };
        delete newAmounts[userName];
        return newAmounts;
      });
    } else {
      setSplitWith([...splitWith, userName]);
    }
  };

  // Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    console.log({
      expenseName,
      expenseCost,
      selectedEvent: selectedEvent?.eventName,
      paidBy,
      splitMethod,
      splitWith,
      splitAmounts,
    });

    resetAllFormFields();
  };

  // Toggle visibility
  const toggleVisibility = () => {
    setIsVisible((prev) => !prev);
    if (isVisible) resetAllFormFields();
  };

  return (
    <div
      className={`absolute w-full bg-gray-50 transition-all duration-500 ease-out rounded-t-2xl border-t-2 border-t-gray-300
      ${isVisible ? 'top-0 h-full z-20' : 'top-full h-0'}`}
    >
      {isVisible && (
        <ScrollableWrapper height="calc(100vh)">
          <div className="p-5 grid gap-6">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold">Add Expense</h1>
              <img src={Writing} alt="Edit" className="h-6 w-6" />
              <button
                onClick={toggleVisibility}
                className="ml-auto bg-white hover:bg-gray-200 cursor-pointer p-2 rounded-md"
              >
                Close
              </button>
            </div>

            <form onSubmit={handleSubmit} className="grid gap-6">
              {/* Expense Name */}
              <div className="grid gap-2">
                <label className="text-sm font-medium">Expense Name</label>
                <input
                  type="text"
                  value={expenseName}
                  onChange={(e) => setExpenseName(e.target.value)}
                  className="w-full p-2.5 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter expense name"
                  required
                />
              </div>

              {/* Event Selection */}
              <div className="grid gap-2">
                <label className="text-sm font-medium">Select Event</label>
                <select
                  value={selectedEvent?.eventName || ''}
                  onChange={(e) => {
                    const selected = events.find(
                      (event) => event.eventName === e.target.value,
                    );
                    handleEventChange(selected);
                  }}
                  className="w-full p-2.5 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select an event</option>
                  {events.map((event) => (
                    <option key={event.eventName} value={event.eventName}>
                      {event.eventName}
                    </option>
                  ))}
                </select>
              </div>

              {/* Cost Input */}
              <div className="grid gap-2">
                <label className="text-sm font-medium">Cost</label>
                <input
                  type="number"
                  value={expenseCost}
                  onChange={(e) => setExpenseCost(e.target.value)}
                  placeholder="0.00"
                  className="w-full p-2.5 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="0"
                  step="0.01"
                  required
                />
              </div>

              {/* Paid By Display */}
              {selectedEvent && paidBy && (
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Paid By</label>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8">
                      <ProfileImage
                        text={paidBy.charAt(0)}
                        className="w-full h-full rounded-full bg-blue-100"
                      />
                    </div>
                    <span className="text-gray-600">{paidBy}</span>
                  </div>
                </div>
              )}

              {/* Split Method */}
              <div className="grid gap-2">
                <label className="text-sm font-medium">
                  How will you split the cost?
                </label>
                <div className="grid grid-cols-3 border border-gray-300 rounded overflow-hidden">
                  {['equally', 'exact', '%'].map((method) => (
                    <div key={method} className="flex-1">
                      <input
                        type="radio"
                        name="splitMethod"
                        id={method}
                        value={method}
                        checked={splitMethod === method}
                        onChange={() => setSplitMethod(method)}
                        className="hidden"
                      />
                      <label
                        htmlFor={method}
                        className={`w-full px-2 py-2 text-sm cursor-pointer transition-colors flex items-center justify-center ${
                          splitMethod === method
                            ? 'bg-blue-500 text-white'
                            : 'bg-white text-gray-700'
                        }`}
                      >
                        {method === 'equally' && 'Equally'}
                        {method === 'exact' && 'Exact'}
                        {method === '%' && 'Percentage'}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Split With Section */}
              {selectedEvent && paidBy && (
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Split With</label>
                  <div className="flex flex-wrap gap-3">
                    {selectedEvent.users
                      .filter((user) => user !== paidBy)
                      .map((user) => (
                        <div key={user} className="relative">
                          <button
                            type="button"
                            onClick={() => handleSplitWithToggle(user)}
                          >
                            <div className="w-8 h-8">
                              <ProfileImage
                                text={user.charAt(0)}
                                className={`w-full h-full rounded-full cursor-pointer transition-all ${
                                  splitWith.includes(user)
                                    ? 'ring-2 ring-green-500 scale-110 bg-green-100'
                                    : 'opacity-50 hover:opacity-75'
                                }`}
                              />
                            </div>
                          </button>
                          {splitWith.includes(user) && (
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                              <svg
                                className="w-2 h-2 text-white"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                              </svg>
                            </div>
                          )}
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {/* Split Amounts */}
              {expenseCost && splitWith.length > 0 && (
                <div className="mt-2 grid gap-2">
                  {[paidBy, ...splitWith].map((user) => (
                    <div key={user} className="grid gap-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">
                          {user}
                          {user === paidBy && ' (paid by)'}
                        </span>
                        {splitMethod !== 'equally' && (
                          <span className="text-xs text-gray-500">
                            {splitMethod === '%' ? 'Percentage' : 'Amount'}
                          </span>
                        )}
                      </div>

                      {splitMethod === '%' ? (
                        <div className="relative">
                          <input
                            type="number"
                            value={splitAmounts[user] || ''}
                            onChange={(e) =>
                              handleSplitAmountChange(user, e.target.value)
                            }
                            placeholder="Percentage"
                            className="w-full p-2.5 pr-10 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            readOnly={splitMethod === 'equally'}
                            max={100}
                          />
                          <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500">
                            %
                          </span>
                        </div>
                      ) : (
                        <input
                          type="number"
                          value={splitAmounts[user] || ''}
                          onChange={(e) =>
                            handleSplitAmountChange(user, e.target.value)
                          }
                          placeholder="Amount"
                          className="w-full p-2.5 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                          readOnly={splitMethod === 'equally'}
                          max={expenseCost}
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
                disabled={!isFormValid}
              >
                Add Expense
              </button>
            </form>
          </div>
        </ScrollableWrapper>
      )}
    </div>
  );
};

export default AddExpense;
