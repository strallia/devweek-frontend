import { useState } from 'react';

const AddGroup = ({ isVisible, setIsVisible }) => {
  const [groupName, setGroupName] = useState('');
  const [groupDescription, setGroupDescription] = useState('');
  const [location, setLocation] = useState('');
  const [visibility, setVisibility] = useState('Private');
  const [category, setCategory] = useState('Placeholder');

  const toggleVisibility = () => {
    setIsVisible((prev) => !prev);
  };

  const handleSaveGroup = () => {
    const newGroup = {
      groupName,
      groupDescription,
      location,
      visibility,
      category,
    };

    console.log(newGroup);
    toggleVisibility();
  };

  return (
    <div
      className={`absolute w-full bg-white transition-all duration-500 ease-out 
        ${isVisible ? 'top-0 h-full' : 'top-full h-0'} rounded-t-3xl shadow-lg overflow-hidden`}
    >
      {isVisible && (
        <div className="flex flex-col p-6 space-y-4">
          <h2 className="text-xl font-semibold flex justify-between items-center">
            Group Name
            <button className="text-sm text-blue-500">Add Members +</button>
          </h2>

          {/* Group Name */}
          <div>
            <label htmlFor="group-name" className="text-sm font-medium text-gray-700">
              Group Name
            </label>
            <input
              type="text"
              id="group-name"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              placeholder="Enter group name"
              className="mt-2 p-2 w-full border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Group Description */}
          <div>
            <label htmlFor="group-description" className="text-sm font-medium text-gray-700">
              Description
            </label>
            <input
              type="text"
              id="group-description"
              value={groupDescription}
              onChange={(e) => setGroupDescription(e.target.value)}
              placeholder="Enter description"
              className="mt-2 p-2 w-full border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Location */}
          <div>
            <label htmlFor="location" className="text-sm font-medium text-gray-700">
              Location
            </label>
            <input
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter event location"
              className="mt-2 p-2 w-full border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Visibility */}
          <div>
            <label htmlFor="visibility" className="text-sm font-medium text-gray-700">
              Visibility
            </label>
            <select
              id="visibility"
              value={visibility}
              onChange={(e) => setVisibility(e.target.value)}
              className="mt-2 p-2 w-full border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Private">Private</option>
              <option value="Public">Public</option>
              {/* Add more visibility options if necessary */}
            </select>
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-2 p-2 w-full border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Placeholder">Placeholder</option>
              {/* Add more category options if needed */}
            </select>
          </div>

          <div className="flex justify-between">
            {/* Create Group Button */}
            <button
              onClick={handleSaveGroup}
              className="bg-gray-800 text-white p-3 w-full rounded-md mt-4"
            >
              Create Group
            </button>

            {/* Close Button */}
            <button onClick={toggleVisibility} className="text-sm text-gray-500 mt-4">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddGroup;
