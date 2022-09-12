import styled from 'styled-components';

interface GoogleLoginProps {
  onLoginWithGoogle: () => void;
}

export default function GoogleLoginButton({ onLoginWithGoogle }: GoogleLoginProps) {
  return (
    <GoogleLoginButtonStyle onClick={onLoginWithGoogle}>
      <span>Sign in with Google</span>
    </GoogleLoginButtonStyle>
  );
}

const GoogleLoginButtonStyle = styled.button`
  height: 2.5rem;
  background-color: ${props => props.theme.color.skyBlue};
  & > div {
    background-color: ${props => props.theme.color.white};
  }
  & > span {
    font-size: 1.2rem;
    color: ${props => props.theme.color.white};
  }
`;
