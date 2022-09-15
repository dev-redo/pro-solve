import React from 'react';
import styled from 'styled-components';
import { GoogleLoginProps } from '../../types/popup';
import Spinner from '../../../assets/icons/Spinner.svg';

export default function GoogleLoginButton({ onLoginWithGoogle }: GoogleLoginProps) {
  const [isLoaded, setIsLoaded] = React.useState(false);

  return (
    <GoogleLoginButtonStyle
      onClick={() => {
        setIsLoaded(true);
        onLoginWithGoogle();
      }}
    >
      {isLoaded || <span>Sign in with Google</span>}
      {isLoaded && <Spinner />}
    </GoogleLoginButtonStyle>
  );
}

const GoogleLoginButtonStyle = styled.button`
  width: 100%;
  height: 2.5rem;
  background-color: ${props => props.theme.color.skyBlue};
  margin-top: 0.4rem;
  font-size: 1.2rem;
  font-family: 'NanumSquareBold', sans-serif;
  color: ${props => props.theme.color.white};
  & > svg {
    width: 1.35rem;
    height: 1.35rem;
  }
`;
