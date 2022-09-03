import { createGlobalStyle } from 'styled-components';

const font = createGlobalStyle`
  @font-face {
    font-family:'SCDreamRegular';
    src: url(${require('../../static/fonts/SCDream5.otf')});
  }
`;

export default font;
