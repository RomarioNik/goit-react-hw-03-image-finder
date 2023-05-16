import { Component } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import { Container } from './App.styled';
class App extends Component {
  state = {
    search: '',
    modal: false,
  };

  handleSubmitForm = searchParam => {
    this.setState({ search: searchParam });
  };

  isPhotoLoaded = bool => {
    this.setState({ isPhotoLoad: bool });
  };

  onToggleModal = () => {
    this.setState(({ modal }) => ({ modal: !modal }));
  };

  render() {
    const { search, modal } = this.state;

    return (
      <Container>
        <Searchbar onSubmit={this.handleSubmitForm} />
        <ImageGallery
          searchParam={search}
          isPhotoLoaded={this.isPhotoLoaded}
          modal={modal}
          onToggleModal={this.onToggleModal}
        />
      </Container>
    );
  }
}

export default App;
