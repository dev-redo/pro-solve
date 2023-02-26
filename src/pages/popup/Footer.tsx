import styled from 'styled-components';
import GithubLogo from '@assets/images/github.png';

const Footer = () => {
  return (
    <FooterStyle href="https://github.com/dev-redo/pro-solve" target="_blank">
      <span>
        <img src={GithubLogo} />
      </span>
      <span>Github 바로가기</span>
    </FooterStyle>
  );
};

export default Footer;

const FooterStyle = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 1.35rem;
    height: 1.35rem;
  }
  span {
    font-size: 1rem;
    margin-right: 0.3rem;
    font-weight: 400;
  }
`;
