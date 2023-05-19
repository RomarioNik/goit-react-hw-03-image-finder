import PropTypes from 'prop-types';
import { LoadButton } from './Button.styled';

const Button = ({ onHandleClickButtonLoad }) => {
  return <LoadButton onClick={onHandleClickButtonLoad}>Load more</LoadButton>;
};

export default Button;

Button.propTypes = {
  onHandleClickButtonLoad: PropTypes.func.isRequired,
};
