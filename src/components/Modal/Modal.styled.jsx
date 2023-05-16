import styled from 'styled-components';
import { ReactComponent as close } from '../../images/close.svg';

export const BackDrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const ModalStyled = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  max-width: 500px;
  background-color: transparent;
  border-radius: 12px;
  transform: translate(-50%, -50%);
`;

export const Button = styled.button`
  position: absolute;
  bottom: -40px;
  right: 0;
  border: none;
  background-color: transparent;
`;

export const IconClose = styled(close)`
  width: 30px;
  height: 30px;
  fill: #ffffff;
`;
