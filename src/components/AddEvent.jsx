import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Dummy data for testing
const dummyGroups = ['Group 1', 'Group 2', 'Group 3', 'Group 4'];

const AddEvent = ({ isVisible, setIsVisible }) => {
  const [eventName, setEventName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('');
  const [date, setDate] = useState('');
  const navigate = useNavigate();

  const toggleVisibility = () => {
    setIsVisible((prev) => !prev);
  };

  const handleSaveEvent = () => {
    const newEvent = {
      eventName,
      description,
      selectedGroup,
      date,
    };
    // navigate('/event', { state: newEvent });
    toggleVisibility(); // Closing the modal after saving
  };

  if (!Array.isArray(dummyGroups)) {
    return <div>Loading...</div>; // Or return nothing if groups are invalid
  }

  return (
    <div
      className={`absolute w-full bg-gray-50 transition-all duration-500 ease-out rounded-t-2xl border-t-2 border-t-gray-300
          ${isVisible ? 'top-0 h-full z-20' : 'top-full h-0'}`}
    >
      {isVisible && (
        <div className="flex flex-col p-6 space-y-4">
          <div className="flex justify-between">
            <h2 className="text-xl font-semibold">Add Event</h2>

            {/* Close Button */}
            <button
              onClick={toggleVisibility}
              className="ml-auto bg-white hover:bg-gray-200 cursor-pointer p-2 rounded-md"
            >
              Close
            </button>
          </div>

          {/* Event Name */}
          <div>
            <label
              htmlFor="event-name"
              className="text-sm font-medium text-gray-700"
            >
              Event Name
            </label>
            <input
              type="text"
              id="event-name"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              placeholder="Enter event name"
              className="mt-2 p-2 w-full border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="event-description"
              className="text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <input
              type="text"
              id="event-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description"
              className="mt-2 p-2 w-full border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Group Selector */}
          <div>
            <label
              htmlFor="select-group"
              className="text-sm font-medium text-gray-700"
            >
              Select Group
            </label>
            <select
              id="select-group"
              value={selectedGroup}
              onChange={(e) => setSelectedGroup(e.target.value)}
              className="mt-2 p-2 w-full border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Group</option>
              {dummyGroups.map((group, index) => (
                <option key={index} value={group}>
                  {group}
                </option>
              ))}
            </select>
          </div>

          {/* Date Picker */}
          <div>
            <label
              htmlFor="select-date"
              className="text-sm font-medium text-gray-700"
            >
              Select Date
            </label>
            <input
              type="date"
              id="select-date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-2 p-2 w-full border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex">
            {/* Save Button */}
            <button
              onClick={handleSaveEvent}
              className="bg-blue-500 text-white p-2 rounded-md w-full"
            >
              Save Event
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddEvent;
