import styled from 'styled-components';
import { LoginProps } from '../../types/popup';
import GoogleLoginButton from '../../components/button/GoogleLoginButton';

export default function Popup({ children }: { children: JSX.Element[] }) {
  return <ContainerStyle>{children}</ContainerStyle>;
}

Popup.Header = () => {
  return (
    <HeaderStyle>
      <h1>프로솔브</h1>
      <span>프로그래머스 풀이를 저장하는 크롬 익스텐션</span>
    </HeaderStyle>
  );
};

Popup.Login = ({ isLoaded, userEmail, onLoginWithGoogle }: LoginProps) => {
  if (isLoaded) {
    return (
      <div>
        <span>로그인 여부 확인하는 데 약 3초 정도 시간이 걸립니다.</span>
        <span>잠시만 기다려주세요 ...</span>
      </div>
    );
  }

  return (
    <>
      {userEmail && <div>Your Email: {userEmail}</div>}
      {userEmail || <GoogleLoginButton onLoginWithGoogle={onLoginWithGoogle} />}
    </>
  );
};

Popup.Footer = () => {
  return (
    <FooterStyle>
      <a href="https://github.com/dev-redo/pro-solve">Github 바로가기</a>
    </FooterStyle>
  );
};

const ContainerStyle = styled.div`
  display: flex;
  flex-direction: column;
  width: 25rem;
  height: 17rem;
  padding: 1.5rem 2rem;
  gap: 1rem;
`;

const HeaderStyle = styled.div`
  display: flex;
  flex-direction: column;
  h1 {
    font-size: 2.3rem;
    padding-bottom: 0.8rem;
  }
  span {
    font-size: 1rem;
    color: ${props => props.theme.color.darkGrey};
  }
`;

const FooterStyle = styled.div``;
