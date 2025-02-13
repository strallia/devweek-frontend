const ProfileImage = ({ image, text }) => {
  const generateRandomPastelColor = () => {
    const r = Math.floor(Math.random() * 128) + 127;
    const g = Math.floor(Math.random() * 128) + 127;
    const b = Math.floor(Math.random() * 128) + 127;
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  };

  return (
    <div>
      {image ? (
        <img src={image} />
      ) : (
        <div
          className="bg-gray-200 h-full w-full font-bold text-xl text-center content-center rounded-full"
          style={{ backgroundColor: generateRandomPastelColor() }}
        >
          {text}
        </div>
      )}
    </div>
  );
};

export default ProfileImage;
