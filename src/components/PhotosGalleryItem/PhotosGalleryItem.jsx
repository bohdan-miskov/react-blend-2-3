import styles from './PhotosGalleryItem.module.css';

const PhotosGalleryItem = ({ id, alt, src, color, chooseImage }) => {
  return (
    <div
      className={styles.thumb}
      style={{ backgroundColor: color, borderColor: color }}
    >
      <img src={src.large} alt={alt} onClick={() => chooseImage(id)} />
    </div>
  );
};
export default PhotosGalleryItem;
