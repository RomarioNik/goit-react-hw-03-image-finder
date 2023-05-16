import styled from 'styled-components';
import { ReactComponent as IconSearch } from '../../images/search.svg';

export const Header = styled.header`
  width: 100%;
  padding-top: 20px;
  padding-bottom: 20px;
  display: flex;
  justify-content: center;
`;

export const Form = styled.form`
  display: flex;
  width: 400px;
`;

export const Input = styled.input`
  width: 100%;
  max-width: 400px;
  height: 30px;
  padding: 4px 4px;
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  border-radius: 0 8px 8px 0;
  background-color: ${({ theme }) => theme.colors.bgItems};
  border-left: none;
  outline: none;
`;

export const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  padding: 4px 4px;
  font-weight: 500;
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  border-radius: 8px 0 0 8px;
  border-right: none;
  background-color: ${({ theme }) => theme.colors.bgItems};
`;

export const Icon = styled(IconSearch)`
  width: 20px;
  height: 20px;
  stroke: #8a8a8a;
`;
