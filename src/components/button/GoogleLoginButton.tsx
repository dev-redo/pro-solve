import React from 'react';
import styled from 'styled-components';
import Spinner from '@assets/icons/WhiteSpinner.svg';
import { auth } from '@src/firebase';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import '@src/styles/font.css';

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

type GoogleLoginFn = () => void;
const getGoogleAuthCredential: GoogleLoginFn = () => {
  chrome.identity.getAuthToken({ interactive: true }, token => {
    if (chrome.runtime.lastError || !token) {
      alert(
        `[Pro-Solve] Token을 받아오던 중 문제가 발생했습니다! :>> ${
          chrome.runtime.lastError!.message
        }`,
      );
      return;
    }

    const credential = GoogleAuthProvider.credential(null, token);
    console.log('[Pro-Solve] Firebase Google Oauth credential :>> ', credential);
    signInWithCredential(auth, credential)
      .then(firebaseAuth => {
        console.log('[Pro-Solve] Firebase 사용자 인증 정보 :>>', firebaseAuth);
      })
      .catch(error => {
        if (error.code === 'auth/invalid-credential') {
          chrome.identity.removeCachedAuthToken({ token }, getGoogleAuthCredential);
        }
      });
  });
};

const GoogleLoginButtonStyle = styled.button`
  width: 100%;
  height: 2.5rem;
  background-color: ${({ theme }) => theme.color.skyBlue};
  margin-top: 0.4rem;
  font-size: 1.2rem;
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 500;
  color: ${({ theme }) => theme.color.white};
  & > svg {
    width: 1.35rem;
    height: 1.35rem;
  }
`;
