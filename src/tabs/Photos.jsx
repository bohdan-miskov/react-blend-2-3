import Text from '../components/Text/Text';
import Form from '../components/Form/Form';
import Loader from '../components/Loader/Loader';
import PhotosGallery from '../components/PhotosGallery/PhotosGallery';
import Button from '../components/Button/Button';
import ImageModal from '../components/ImageModal/ImageModal';
import { useState, useEffect } from 'react';
import { getPhotos } from '../apiService/photos.js';

const Photos = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isVisibleLoad, setIsVisibleLoad] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);

  const onHandleSubmit = value => {
    setQuery(value);
    setImages([]);
    setError(null);
    setIsEmpty(false);
    setIsVisibleLoad(false);
    setPage(1);
    setModalIsOpen(false);
  };

  const onLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const chooseImage = id => {
    setCurrentImage(() => images.find(image => image.id === id));
    setModalIsOpen(true);
  };

  const closeImageModal = () => setModalIsOpen(false);

  useEffect(() => {
    const fetchImages = async () => {
      setIsLoading(true);
      try {
        if (!query) {
          return;
        }
        const { photos, per_page, total_results } = await getPhotos(
          query,
          page
        );
        if (photos.length === 0) {
          setIsEmpty(true);
          return;
        }
        setImages(prevImages => [...prevImages, ...photos]);
        setIsVisibleLoad(Math.ceil(total_results / per_page) > 1);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [query, page]);

  return (
    <>
      <Form onHandleSubmit={onHandleSubmit} />
      {isLoading && <Loader />}
      {!images.length && !isLoading && isEmpty && (
        <Text textAlign="center">Lets begin search 🔎</Text>
      )}
      {error && <Text textAlign="center">Something is wrong</Text>}
      {images.length > 0 && (
        <PhotosGallery images={images} chooseImage={chooseImage} />
      )}
      {isEmpty && !error && (
        <Text textAlign="center">Sorry. There are no images ...</Text>
      )}
      {isVisibleLoad && (
        <Button onClick={onLoadMore} disabled={isLoading}>
          {isLoading ? 'Loading' : 'LoadMore'}
        </Button>
      )}
      <ImageModal
        modalIsOpen={modalIsOpen}
        closeModal={closeImageModal}
        src={currentImage ? currentImage.src.large : ''}
        alt={currentImage ? currentImage.alt : ''}
      />
    </>
  );
};

export default Photos;
