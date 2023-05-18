import { Component } from 'react';
import PropTypes from 'prop-types';
import { Header, Form, Input, Button, Icon } from './Searchbar.styled';

class Searchbar extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    search: PropTypes.string,
  };

  state = {
    search: '',
  };

  handleInputChange = ({ target: { value } }) => {
    this.setState({ search: value });
  };

  handleSubmitForm = e => {
    e.preventDefault();
    const { search } = this.state;
    const { onSubmit } = this.props;

    if (search.trim() === '') {
      alert('Enter a pokemon name!');
      return;
    }

    onSubmit(search);
    this.setState({ search: '' });
  };

  render() {
    const { search } = this.state;

    return (
      <Header>
        <Form onSubmit={this.handleSubmitForm}>
          <Button type="submit" area-label="search picture">
            <Icon />
          </Button>
          <Input
            type="text"
            name="search"
            value={search}
            onChange={this.handleInputChange}
            autocomplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </Form>
      </Header>
    );
  }
}

export default Searchbar;
