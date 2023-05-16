import { ListItem, Image } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({
  webformatURL,
  largeImageURL,
  tags,
  onHandleClickImage,
}) => {
  return (
    <ListItem>
      <Image
        src={webformatURL}
        alt={tags}
        onClick={() => onHandleClickImage(largeImageURL)}
      />
    </ListItem>
  );
};

export default ImageGalleryItem;
