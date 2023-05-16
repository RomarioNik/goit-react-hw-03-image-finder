import { Component } from 'react';
import { Bars } from 'react-loader-spinner';
import photosAPI from 'services/pixabay-api';
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
  state = {
    photos: [],
    activePage: 1,
    activeUrl: '',
    error: null,
    status: STATUS.IDLE,
  };

  componentDidMount() {
    this.setState({ status: STATUS.PENDING });

    photosAPI
      .fetchPhotos()
      .then(({ hits }) => {
        if (hits.length === 0) {
          return this.setState({
            photos: hits,
            status: STATUS.REJECTED,
            error: 'We did not found anything. Try again',
          });
        }
        this.setState({ photos: hits, status: STATUS.RESOLVED });
      })
      .catch(err =>
        this.setState({ error: err.message, status: STATUS.REJECTED })
      );
  }

  componentDidUpdate(prevProps, prevState) {
    const prevParam = prevProps.searchParam;
    const nextParam = this.props.searchParam;
    const { activePage } = this.state;
    const { searchParam } = this.props;

    if (prevParam !== nextParam) {
      this.setState({ status: STATUS.PENDING });

      photosAPI
        .fetchPhotosWithParams(nextParam, activePage)
        .then(({ hits }) => {
          if (hits.length === 0) {
            return this.setState({
              photos: hits,
              status: STATUS.REJECTED,
              error: "We didn't find anything. Try again",
            });
          }
          this.setState({ photos: hits, status: STATUS.RESOLVED });
        })
        .catch(err =>
          this.setState({ error: err.message, status: STATUS.REJECTED })
        );
    }

    if (prevState.activePage !== this.state.activePage) {
      photosAPI
        .fetchPhotosWithParams(searchParam, activePage)
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
    const { photos, status, error, activeUrl } = this.state;
    const { modal, onToggleModal } = this.props;

    if (status === STATUS.PENDING) {
      return (
        <Bars
          height="80"
          width="80"
          color="#4253b0"
          ariaLabel="bars-loading"
          wrapperStyle={{ display: 'flex', justifyContent: 'center' }}
          visible={true}
        />
      );
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
          <ButtonWrapper>
            <Button onHandleClickButtonLoad={this.handleClickButtonLoad} />
          </ButtonWrapper>
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
