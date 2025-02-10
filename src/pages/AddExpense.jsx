import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ScrollableWrapper from '../layouts/ScrollableWrapper';
import ProfileImage from '../components/ProfileImage';
import Writing from '@/assets/icons/writing.svg';
import { events } from '@/utils/mockData';

const AddExpense = () => {
  const [expenseName, setExpenseName] = useState('');
  const [expenseCost, setExpenseCost] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [paidBy, setPaidBy] = useState(null);
  const [splitMethod, setSplitMethod] = useState('equally'); // 'equally', 'exact', or '%'
  const [splitWith, setSplitWith] = useState([]);
  const [splitAmounts, setSplitAmounts] = useState({});

  // Reset form fields when a new event is chosen.
  // Sets paidBy to the first user (if any) and also initializes splitWith with that user.
  const resetFormFields = (newEvent) => {
    setExpenseCost('');
    setSplitMethod('equally');
    const defaultPaidBy = newEvent?.users[0] || null;
    setPaidBy(defaultPaidBy);
    setSplitWith(defaultPaidBy ? [defaultPaidBy] : []);
    setSplitAmounts({});
  };

  // Always ensure that the user selected as "paidBy" is in the "splitWith" list.
  useEffect(() => {
    if (paidBy && !splitWith.includes(paidBy)) {
      setSplitWith((prev) => [...prev, paidBy]);
    }
  }, [paidBy, splitWith]);

  // When expenseCost, splitMethod, or splitWith changes, update default split amounts.
  useEffect(() => {
    if (!expenseCost) return;
    if (splitMethod === 'equally') {
      const costValue = parseFloat(expenseCost) || 0;
      const defaultAmount =
        splitWith.length > 0 ? (costValue / splitWith.length).toFixed(2) : '0';
      const newAmounts = {};
      splitWith.forEach((user) => {
        newAmounts[user] = defaultAmount;
      });
      setSplitAmounts(newAmounts);
    } else if (splitMethod === '%') {
      // Use toFixed(0) so that 25 is shown instead of 25.00.
      const defaultPercent =
        splitWith.length > 0 ? (100 / splitWith.length).toFixed(0) : '0';
      const newAmounts = {};
      splitWith.forEach((user) => {
        newAmounts[user] = defaultPercent;
      });
      setSplitAmounts(newAmounts);
    }
  }, [expenseCost, splitWith, splitMethod]);

  // For "exact" method, clear any changes (default to empty fields) when the method changes.
  useEffect(() => {
    if (splitMethod === 'exact') {
      const newAmounts = {};
      splitWith.forEach((user) => {
        newAmounts[user] = '';
      });
      setSplitAmounts(newAmounts);
    }
  }, [splitMethod, splitWith]);

  // For "exact" and "%" modes, ensure that entered values don’t make the total exceed:
  // - The total cost (for "exact")
  // - 100 (for "%")
  const handleSplitAmountChange = (user, newValue) => {
    // Allow empty value (user clearing the field)
    if (newValue === '') {
      setSplitAmounts((prev) => ({ ...prev, [user]: newValue }));
      return;
    }
    const parsedValue = parseFloat(newValue);
    if (splitMethod === 'exact') {
      const costValue = parseFloat(expenseCost) || 0;
      if (parsedValue > costValue) return; // individual value must not exceed total cost
      let total = parsedValue;
      splitWith.forEach((u) => {
        if (u !== user) {
          total += parseFloat(splitAmounts[u]) || 0;
        }
      });
      if (total > costValue) return;
    } else if (splitMethod === '%') {
      if (parsedValue > 100) return; // individual value must not exceed 100%
      let total = parsedValue;
      splitWith.forEach((u) => {
        if (u !== user) {
          total += parseFloat(splitAmounts[u]) || 0;
        }
      });
      if (total > 100) return;
    }
    setSplitAmounts((prev) => ({ ...prev, [user]: newValue }));
  };

  // Toggle selection for "Split With" users.
  // (Note: the current "paidBy" cannot be deselected here.)
  const handleSplitWithToggle = (userName) => {
    if (userName === paidBy) return; // lock the paidBy user in the selection
    if (splitWith.includes(userName)) {
      setSplitWith(splitWith.filter((u) => u !== userName));
      setSplitAmounts((prev) => {
        const newAmounts = { ...prev };
        delete newAmounts[userName];
        return newAmounts;
      });
    } else {
      setSplitWith([...splitWith, userName]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      expenseName,
      expenseCost,
      selectedEvent: selectedEvent?.eventName,
      paidBy,
      splitMethod,
      splitWith,
      splitAmounts,
    });
  };

  return (
    <ScrollableWrapper height="calc(100vh - 60px - 80px)">
      <div className="p-5 grid gap-6">
        {/* Header */}
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold">Expense Name</h1>
          <img src={Writing} alt="Edit" className="h-6 w-6" />
        </div>

        <form onSubmit={handleSubmit} className="grid gap-6">
          {/* Event Selection */}
          <div className="grid gap-2">
            <label className="text-sm font-medium">Select Event</label>
            <select
              value={selectedEvent?.eventName || ''}
              onChange={(e) => {
                const selected = events.find(
                  (event) => event.eventName === e.target.value
                );
                setSelectedEvent(selected);
                // Reset the form fields after selecting a new event.
                resetFormFields(selected);
              }}
              className="w-full p-2.5 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select an event</option>
              {events.map((event, index) => (
                <option key={index} value={event.eventName}>
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

          {/* Paid By Section */}
          {selectedEvent && (
            <div className="grid gap-2">
              <label className="text-sm font-medium">Paid By</label>
              <div className="flex gap-3 justify-start">
                {selectedEvent.users.map((user) => (
                  <div key={user} className="relative">
                    <button
                      type="button"
                      onClick={() => {
                        if (paidBy === user) return;
                        setPaidBy(user);
                        if (!splitWith.includes(user)) {
                          setSplitWith((prev) => [...prev, user]);
                        }
                      }}
                    >
                      <div className="w-8 h-8">
                        <ProfileImage
                          text={user.charAt(0)}
                          className={`w-full h-full rounded-full cursor-pointer transition-all ${
                            paidBy === user
                              ? 'ring-2 ring-blue-500 scale-110 bg-blue-100'
                              : 'opacity-75 hover:opacity-100'
                          }`}
                        />
                      </div>
                    </button>
                    {paidBy === user && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full" />
                      </div>
                    )}
                  </div>
                ))}
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
          {selectedEvent && (
            <div className="grid gap-2">
              <label className="text-sm font-medium">Split With</label>
              <div className="flex flex-wrap gap-3">
                {selectedEvent.users.map((user) => (
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
                              ? user === paidBy
                                ? 'ring-2 ring-blue-500 scale-110 bg-blue-100'
                                : 'ring-2 ring-green-500 scale-110 bg-green-100'
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

          {/* Split Amounts Input Fields */}
          {/* These fields are shown only when a cost has been entered. */}
          {expenseCost && splitWith.length > 0 && (
            <div className="mt-2 grid gap-2">
              {splitWith.map((user) => (
                <div key={user} className="grid gap-1">
                  <label className="text-sm font-medium">{user}</label>
                  {splitMethod === '%' ? (
                    <div className="relative">
                      <input
                        type="number"
                        value={splitAmounts[user] || ''}
                        onChange={(e) => {
                          if (splitMethod !== 'equally') {
                            handleSplitAmountChange(user, e.target.value);
                          }
                        }}
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
                      onChange={(e) => {
                        if (splitMethod !== 'equally') {
                          handleSplitAmountChange(user, e.target.value);
                        }
                      }}
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
            className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium"
          >
            Add Expense
          </button>
        </form>
      </div>
    </ScrollableWrapper>
  );
};

export default AddExpense;
