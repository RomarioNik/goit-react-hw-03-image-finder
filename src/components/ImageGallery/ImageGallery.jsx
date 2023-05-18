import { Component } from 'react';
import { Bars } from 'react-loader-spinner';
import PropTypes from 'prop-types';
import { fetchPhotos } from 'services/pixabay-api';
import ImageGalleryItem from '../ImageGalleryItem';
import Button from 'components/Button';
import Modal from 'components/Modal';
import { List, TextError, ButtonWrapper, Picture } from './ImageGallery.styled';

const STATUS = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

class ImageGallery extends Component {
  static propTypes = {
    searchParam: PropTypes.string.isRequired,
    isPhotoLoaded: PropTypes.func.isRequired,
    onToggleModal: PropTypes.func.isRequired,
    modal: PropTypes.bool.isRequired,
  };

  state = {
    photos: [],
    activePage: 1,
    activeUrl: '',
    error: null,
    status: STATUS.IDLE,
    isNextPageLoad: false,
  };

  loader = (
    <Bars
      height="80"
      width="80"
      color="#4253b0"
      ariaLabel="bars-loading"
      wrapperStyle={{ display: 'flex', justifyContent: 'center' }}
      visible={true}
    />
  );

  componentDidUpdate(prevProps, prevState) {
    const prevParam = prevProps.searchParam;
    const nextParam = this.props.searchParam;
    const prevPage = prevState.activePage;
    const nextPage = this.state.activePage;

    if (prevParam !== nextParam) {
      this.setState({ status: STATUS.PENDING });

      fetchPhotos(nextParam, 1)
        .then(({ hits }) => {
          if (hits.length === 0) {
            return this.setState({
              photos: hits,
              status: STATUS.REJECTED,
              error: "We didn't find anything. Try again",
            });
          }
          this.setState({
            photos: hits,
            status: STATUS.RESOLVED,
            activePage: 1,
          });
        })
        .catch(err =>
          this.setState({ error: err.message, status: STATUS.REJECTED })
        );
    }

    if (prevPage !== nextPage && nextPage !== 1) {
      this.setState({ isNextPageLoad: true });
      fetchPhotos(nextParam, nextPage)
        .then(({ hits }) => {
          if (hits.length === 0) {
            return this.setState({
              photos: hits,
              status: STATUS.REJECTED,
              error: "We didn't find anything. Try again",
            });
          }
          this.setState(prevState => ({
            photos: [...prevState.photos, ...hits],
            isNextPageLoad: false,
          }));
        })
        .catch(err =>
          this.setState({ error: err.message, status: STATUS.REJECTED })
        );
    }
  }

  handleClickButtonLoad = async () => {
    this.setState(({ activePage }) => ({ activePage: activePage + 1 }));
  };

  handleClickImage = url => {
    this.setState({ activeUrl: url });
    this.props.onToggleModal();
  };

  render() {
    const { photos, status, error, activeUrl, isNextPageLoad } = this.state;
    const { modal, onToggleModal } = this.props;

    if (status === STATUS.PENDING) {
      return this.loader;
    }

    if (status === STATUS.REJECTED) {
      return <TextError>{error}</TextError>;
    }

    if (status === STATUS.RESOLVED) {
      return (
        <>
          <List>
            {photos.map(({ id, webformatURL, largeImageURL, tags }) => (
              <ImageGalleryItem
                key={id}
                webformatURL={webformatURL}
                largeImageURL={largeImageURL}
                tags={tags}
                onHandleClickImage={this.handleClickImage}
              />
            ))}
          </List>

          {isNextPageLoad ? (
            this.loader
          ) : (
            <ButtonWrapper>
              <Button onHandleClickButtonLoad={this.handleClickButtonLoad} />
            </ButtonWrapper>
          )}

          {modal && (
            <Modal onToggleModal={onToggleModal}>
              <Picture src={activeUrl} />
            </Modal>
          )}
        </>
      );
    }
  }
}

export default ImageGallery;
