import React from 'react';
import styled from 'styled-components';
import { GoogleLoginProps } from '../../types/popup';
import { ReactComponent as Spinner } from '../../static/icons/Spinner.svg';

export default function GoogleLoginButton({ onLoginWithGoogle }: GoogleLoginProps) {
  const [isLoaded, setIsLoaded] = React.useState(false);

  return (
    <GoogleLoginButtonStyle
      onClick={() => {
        setIsLoaded(true);
        onLoginWithGoogle;
      }}
    >
      {isLoaded || <span>Sign in with Google</span>}
      {isLoaded && <Spinner />}
    </GoogleLoginButtonStyle>
  );
}

const GoogleLoginButtonStyle = styled.button`
  height: 2.5rem;
  background-color: ${props => props.theme.color.skyBlue};
  & > span {
    font-size: 1.2rem;
    color: ${props => props.theme.color.white};
  }
  & > svg {
  }
`;
