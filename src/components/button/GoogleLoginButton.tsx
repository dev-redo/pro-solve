import React from 'react';
import styled from 'styled-components';
import Spinner from '../../../assets/icons/Spinner.svg';
import { getGoogleAuthCredential } from '../../hooks/getGoogleAuthCredential';

export default function GoogleLoginButton() {
  const [isLoaded, setIsLoaded] = React.useState(false);

  return (
    <GoogleLoginButtonStyle
      onClick={() => {
        setIsLoaded(true);
        getGoogleAuthCredential();
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
