const Image = ({
  url,
  size,
  borderRadius,
  containerStyles,
  imageStyles,
  imageText,
}) => {
  const dimensions =
    size === 'small' ? 'h-8 w-8' : size === 'med' ? 'h-24 w-24' : 'h-64 w-64';

  const rounded =
    borderRadius === 'circle'
      ? 'rounded-full'
      : borderRadius === 'square'
        ? ''
        : 'rounded-md';

  return (
    <div
      className={`${dimensions} ${rounded} overflow-hidden shrink-0`}
      style={containerStyles}
    >
      {url ? (
        <img src={url} />
      ) : (
        <div
          className="bg-gray-200 h-full w-full font-bold text-2xl text-center content-center"
          style={imageStyles}
        >
          {imageText}
        </div>
      )}
    </div>
  );
};

export default Image;
