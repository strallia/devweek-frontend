import DefaultImage from './DefaultImage';

const Image = ({ url }) => {
  return (
    <div className={`overflow-hidden shrink-0`}>
      {url ? <img src={url} /> : <DefaultImage />}
    </div>
  );
};

export default Image;
