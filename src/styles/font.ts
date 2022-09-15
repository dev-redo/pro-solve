import { createGlobalStyle } from 'styled-components';
import NanumSquareBold from '../../assets/fonts/NanumSquareB.ttf';
import NanumSquareExtraBold from '../../assets/fonts/NanumSquareEB.ttf';
import NanumSquareLight from '../../assets/fonts/NanumSquareL.ttf';
import NanumSquareRegular from '../../assets/fonts/NanumSquareR.ttf';

const GlobalFonts = createGlobalStyle`
  @font-face {
    font-family:'NanumSquareBold';
    src: local("NanumSquareBold"), url(${NanumSquareBold}) format('truetype');
    font-weight: bold;
  }
  @font-face {
    font-family: 'NanumSquareExtraBold';
    src: local("NanumSquareExtraBold"), url(${NanumSquareExtraBold}) format('truetype');
    font-weight: bolder;
  }
  @font-face {
    font-family: 'NanumSquareLight';
    src: local("NanumSquareLight"), url(${NanumSquareLight}) format('truetype');
    font-weight: lighter;
  }
  @font-face {
    font-family: 'NanumSquareRegular';
    src: local("NanumSquareRegular"), url(${NanumSquareRegular}) format('truetype');
    font-weight: normal;
  }
`;

export default GlobalFonts;
