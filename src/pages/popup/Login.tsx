import styled from 'styled-components';
import GoogleLoginButton from '@src/components/shared/button/GoogleLoginButton';

interface LoginProps {
  isLoaded: boolean;
  userEmail: string;
}

const Login = ({ isLoaded, userEmail }: LoginProps) => {
  if (!isLoaded) {
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
          <span>이메일 주소:</span>
          <span>{userEmail}</span>
        </UserInfoStyle>
      )}
    </>
  );
};

export default Login;

const LoadingStyle = styled.div`
  display: grid;
  grid-row-gap: 0.3rem;
  div {
    font-size: 0.8rem;
    color: ${({ theme }) => theme.color.darkGrey};
    font-weight: 400;
  }
`;

const UserInfoStyle = styled.div`
  font-size: 1.1rem;
  gap: 1rem;
  font-weight: 500;
  span:first-child {
    color: ${({ theme }) => theme.color.darkGrey};
    margin-right: 0.5rem;
  }
  span:last-child {
    color: ${({ theme }) => theme.color.deepBlue};
  }
`;

const LoginStyle = styled.div`
  & > span {
    font-size: 0.8rem;
    font-weight: 400;
    color: ${({ theme }) => theme.color.darkGrey};
  }
`;
