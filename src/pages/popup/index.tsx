import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../styles/theme';
import GlobalStyles from '../../styles/global';
import GlobalFonts from '../../styles/font';
import { auth } from '../../firebase';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import Popup from './Popup';

function PopupLayout() {
  const [userEmail, setUserEmail] = React.useState('');
  const [isLoaded, setIsLoaded] = React.useState(true);

  auth.onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
      setUserEmail(firebaseUser.email as string);
    }
    setIsLoaded(false);
  });

  return (
    <Popup>
      <Popup.Content>
        <Popup.Title />
        <Popup.Login
          isLoaded={isLoaded}
          userEmail={userEmail}
          onLoginWithGoogle={getGoogleAuthCredential}
        />
      </Popup.Content>
      <Popup.Footer />
    </Popup>
  );
}

type GoogleLoginFn = () => void;
const getGoogleAuthCredential: GoogleLoginFn = () => {
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
      <GlobalFonts />
      <PopupLayout />
    </ThemeProvider>
  </React.StrictMode>,
);
