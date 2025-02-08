import Image from '@/components/Image';
import DefaultImage from '@/components/DefaultImage';

const GroupName = ({ groupName, image, onClick }) => {
  return (
    <button className="flex gap-1.5 items-center text-sm" onClick={onClick}>
      <div className="w-8 h-8 rounded-md overflow-hidden">
        {image ? <Image url={image} /> : <DefaultImage iconWidth="small" />}
      </div>
      {groupName}
    </button>
  );
};

export default GroupName;
