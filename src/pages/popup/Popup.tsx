import styled from 'styled-components';
import GoogleLoginButton from '../../components/button/GoogleLoginButton';
import GithubLogo from '../../../assets/images/github.png';

export default function Popup({ children }: { children: JSX.Element[] }) {
  return <ContainerStyle>{children}</ContainerStyle>;
}

Popup.Content = ({ children }: { children: JSX.Element[] }) => {
  return <ContentStyle>{children}</ContentStyle>;
};

Popup.Title = () => {
  return (
    <TitleStyle>
      <h1>프로솔브</h1>
      <span>프로그래머스 풀이를 저장하는 크롬 익스텐션</span>
    </TitleStyle>
  );
};

interface LoginProps {
  isLoaded: boolean;
  userEmail: string;
}

Popup.Login = ({ isLoaded, userEmail }: LoginProps) => {
  if (isLoaded) {
    return (
      <LoadingStyle>
        <div>로그인 여부 확인하는 데 약 3초 정도 시간이 걸립니다.</div>
        <div>잠시만 기다려주세요 ...</div>
      </LoadingStyle>
    );
  }

  return (
    <>
      {userEmail === '' && (
        <LoginStyle>
          <span>로그인이 되어있지 않습니다. 로그인을 해주세요!</span>
          <GoogleLoginButton />
        </LoginStyle>
      )}
      {userEmail === '' || (
        <UserInfoStyle>
          <span>Your Email:</span>
          <span>{userEmail}</span>
        </UserInfoStyle>
      )}
    </>
  );
};

Popup.Footer = () => {
  return (
    <FooterStyle href="https://github.com/dev-redo/pro-solve" target="_blank">
      <span>
        <img src={GithubLogo} />
      </span>
      <span>Github 바로가기</span>
    </FooterStyle>
  );
};

const ContainerStyle = styled.div`
  display: flex;
  flex-direction: column;
  width: 25rem;
  height: 15rem;
  padding: 1.5rem 2rem;
  gap: 1rem;
`;

const ContentStyle = styled.div`
  height: 100%;
`;

const TitleStyle = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  h1 {
    font-size: 2.3rem;
    font-family: 'NanumSquareBold', sans-serif;
    padding-bottom: 0.8rem;
  }
  span {
    font-size: 1rem;
    font-family: 'NanumSquareRegular', sans-serif;
    color: ${props => props.theme.color.darkGrey};
  }
`;

const LoadingStyle = styled.div`
  display: grid;
  grid-row-gap: 0.3rem;
  div {
    font-size: 0.8rem;
    color: ${props => props.theme.color.darkGrey};
    font-family: 'NanumSquareRegular', sans-serif;
  }
`;

const UserInfoStyle = styled.div`
  font-size: 1.1rem;
  gap: 1rem;
  font-family: 'NanumSquareBold', sans-serif;
  span:first-child {
    color: ${props => props.theme.color.darkGrey};
    margin-right: 0.5rem;
  }
  span:last-child {
    color: ${props => props.theme.color.deepBlue};
  }
`;

const LoginStyle = styled.div`
  & > span {
    font-size: 0.8rem;
    font-family: 'NanumSquareRegular', sans-serif;
    color: ${props => props.theme.color.darkGrey};
  }
`;

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
    font-family: 'NanumSquareRegular', sans-serif;
  }
`;
