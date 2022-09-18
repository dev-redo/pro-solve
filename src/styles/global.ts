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

export default GlobalStyles;
export { CenterContainer };
