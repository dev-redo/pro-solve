import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyles = createGlobalStyle`
  ${reset}
  * {
    box-sizing:border-box;
    outline:none;
    border:none;
  }
  html, body, #root {
    height: 100%;
  }
  a {
    text-decoration:none;
    color: black;
  }
  button {
    cursor: pointer;
    padding: 0;
  }
`;

const CenterContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const CheckOptionStyle = styled.div<{ isOpen: boolean }>`
  display: flex;
  align-items: center;
  position: relative;
  z-index: 1;
  cursor: pointer;
  font-size: 1rem;
  font-family: 'Nanum Gothic', sans-serif;
  font-weight: 400;
  color: ${({ theme }) => theme.color.darkGrey};
  background-color: ${({ isOpen, theme }) =>
    isOpen ? theme.color.grayishWhite : theme.color.grey};
  margin-bottom: 1rem;
  padding: 0.8rem 1.2rem;
  border-radius: 0.2rem;
  outline: ${({ isOpen, theme }) => isOpen && `${theme.color.grey} 2px solid`};
  &:hover {
    background-color: ${({ theme }) => theme.color.grayishWhite};
  }
  span {
    margin-right: 0.4rem;
  }
`;


export default GlobalStyles;
export { CenterContainer, CheckOptionStyle };
