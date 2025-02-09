const IconButton = ({
  image,
  imageAlt,
  tailwindStyles,
  onClick,
  text,
  isHorizontal,
}) => {
  return (
    <button
      className={`hover:bg-gray-100 cursor-pointer px-2.5 justify-items-center items-center
        ${tailwindStyles} ${isHorizontal ? 'flex' : 'grid'}
      `}
      onClick={onClick}
    >
      <img src={image} alt={imageAlt ? imageAlt : ''} />
      {text}
    </button>
  );
};

export default IconButton;
