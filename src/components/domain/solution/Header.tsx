import LogoWhite from '@assets/images/logo-white.png';
import ArrowRight from '@assets/icons/ArrowRight.svg';
import { GNBStyle, CenterContainer } from '@src/styles/global';
import '@src/styles/font.css';

interface HeaderProps {
  selectedLanguage: string;
  problemName: string;
}

const Header = ({ selectedLanguage, problemName }: HeaderProps) => {
  selectedLanguage = selectedLanguage.replace(/^[a-z]/, char => char.toUpperCase());

  return (
    <GNBStyle>
      <img src={LogoWhite} />
      <div>
        <span>저장된 모든 풀이</span>
        <span>
          <ArrowRight />
        </span>
        <span>
          [{selectedLanguage}] {problemName}
        </span>
      </div>
    </GNBStyle>
  );
};

export default Header;
