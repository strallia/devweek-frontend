import DefaultImage from './DefaultImage';

const Image = ({ url, imageAlt, tailwindHeight }) => {
  return (
    <div className={`overflow-hidden shrink-0 ${tailwindHeight}`}>
      {url ? (
        <img src={url} alt={imageAlt ? imageAlt : ''} />
      ) : (
        <DefaultImage />
      )}
    </div>
  );
};

export default Image;
