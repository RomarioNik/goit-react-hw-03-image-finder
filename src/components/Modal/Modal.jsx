import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { BackDrop, ModalStyled, Button, IconClose } from './Modal.styled';

const modelRoot = document.querySelector('#root-modal');

class Modal extends Component {
  static propTypes = {
    onToggleModal: PropTypes.func.isRequired,
    children: PropTypes.element,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onToggleModal();
    }
  };

  handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onToggleModal();
    }
  };

  render() {
    const { onToggleModal, children } = this.props;

    return createPortal(
      <BackDrop onClick={this.handleBackdropClick}>
        <ModalStyled>
          <Button
            type="button"
            onClick={onToggleModal}
            aria-label="Button close"
          >
            <IconClose />
          </Button>
          {children}
        </ModalStyled>
      </BackDrop>,
      modelRoot
    );
  }
}

export default Modal;
