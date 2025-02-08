import DefaultIcon from '@/assets/icons/default-image.svg';

const DefaultImage = ({ iconWidth }) => {
  const iconWidthClass =
    iconWidth === 'small' ? 'w-5' : iconWidth === 'med' ? 'w-8' : 'w-12';

  return (
    <div className="bg-[#EAF2FF] flex content-center justify-center h-full">
      <img src={DefaultIcon} className={`${iconWidthClass}`} />
    </div>
  );
};

export default DefaultImage;
