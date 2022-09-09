import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../styles/theme';
import GlobalStyles from '../../styles/global';
import { auth, db } from '../../firebase';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';

const Popup = () => {
  const [userInfo, setUserInfo] = React.useState({}); // TODO: userInfo type 지정

  auth.onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
      setUserInfo(firebaseUser);
    }
  });

  return <button onClick={getGoogleAuthCredential}>Email: {userInfo?.email}</button>;
};

const getGoogleAuthCredential = () => {
  chrome.identity.getAuthToken({ interactive: true }, token => {
    if (chrome.runtime.lastError) {
      console.error(
        '[Pro-Solve] Token을 받아오던 중 문제가 발생했습니다! :>> ',
        chrome.runtime.lastError.message,
      );
    }

    const credential = GoogleAuthProvider.credential(null, token);
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

const root = document.createElement('div');
document.body.appendChild(root);
ReactDOM.createRoot(root as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Popup />
    </ThemeProvider>
  </React.StrictMode>,
);
