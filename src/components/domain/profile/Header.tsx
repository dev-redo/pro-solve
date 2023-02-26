import 'chart.js/auto';

import { GNBStyle } from '@src/styles/global';
import LogoWhite from '@assets/images/logo-white.png';

const Header = () => (
  <GNBStyle>
    <img src={LogoWhite} />
    <div>
      <span>나의 풀이 페이지</span>
    </div>
  </GNBStyle>
);

export default Header;
