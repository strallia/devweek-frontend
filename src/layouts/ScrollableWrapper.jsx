const ScrollableWrapper = ({ children, height }) => {
  return (
    <div className="overflow-y-auto" style={{ height }}>
      {children}
    </div>
  );
};

export default ScrollableWrapper;
