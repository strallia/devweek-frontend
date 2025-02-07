const AddEvent = ({ isVisible, setIsVisible }) => {
  const toggleVisiblity = () => {
    setIsVisible((prev) => !prev);
  };

  return (
    <div
      className={`absolute w-full bg-red-100 transition-all duration-500 ease-out
        ${isVisible ? 'top-0 h-full' : 'top-full h-0'}
      `}
    >
      {isVisible ? (
        <>
          add event modal
          <button
            onClick={toggleVisiblity}
            className="absolute right-0 bg-gray-50 cursor-pointer"
          >
            Close modal
          </button>
        </>
      ) : null}
    </div>
  );
};

export default AddEvent;
