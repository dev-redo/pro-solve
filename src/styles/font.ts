import { createGlobalStyle } from 'styled-components';
import NanumSquareBold from '../../assets/fonts/NanumSquareB.ttf';
import NanumSquareExtraBold from '../../assets/fonts/NanumSquareEB.ttf';
import NanumSquareLight from '../../assets/fonts/NanumSquareL.ttf';
import NanumSquareRegular from '../../assets/fonts/NanumSquareR.ttf';
import Consola from '../../assets/fonts/Consola.ttf';
import NotoSansKRBold from '../../assets/fonts/NotoSansKR-Bold.otf';
import NotoSansKRLight from '../../assets/fonts/NotoSansKR-Light.otf';
import NotoSansKRMedium from '../../assets/fonts/NotoSansKR-Medium.otf';
import NotoSansKRRegular from '../../assets/fonts/NotoSansKR-Regular.otf';

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
  @font-face {
    font-family: 'Consola';
    src: local("Consola"), url(${Consola}) format('truetype');
    font-weight: normal;
  }
  @font-face {
    font-family: 'NotoSansKRBold';
    src: local("NotoSansKRBold"), url(${NotoSansKRBold}) format('opentype');
    font-weight: bold;
  }
  @font-face {
    font-family: 'NotoSansKRLight';
    src: local("NotoSansKRLight"), url(${NotoSansKRLight}) format('opentype');
    font-weight: lighter;
  }
  @font-face {
    font-family: 'NotoSansKRMedium';
    src: local("NotoSansKRMedium"), url(${NotoSansKRMedium}) format('opentype');
    font-weight: normal;
  }
  @font-face {
    font-family: 'NotoSansKRRegular';
    src: local("NotoSansKRRegular"), url(${NotoSansKRRegular}) format('opentype');
    font-weight: normal;
  }
`;

export default GlobalFonts;
