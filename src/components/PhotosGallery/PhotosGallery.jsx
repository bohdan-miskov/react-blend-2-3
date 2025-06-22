import PhotosGalleryItem from '../PhotosGalleryItem/PhotosGalleryItem';
import Grid from '../Grid/Grid';
import GridItem from '../GridItem/GridItem';

const PhotosGallery = ({ images, chooseImage }) => {
  return (
    <>
      <h3>PhotosGallery</h3>
      <Grid>
        {images.map(({ id, alt, avg_color, src }) => (
          <GridItem key={id}>
            <PhotosGalleryItem
              id={id}
              alt={alt}
              color={avg_color}
              src={src}
              chooseImage={chooseImage}
            />
          </GridItem>
        ))}
      </Grid>
    </>
  );
};
export default PhotosGallery;
