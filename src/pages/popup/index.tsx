import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../styles/theme';
import GlobalStyles from '../../styles/global';
import { auth } from '../../firebase';
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
        <Popup.Login isLoaded={isLoaded} userEmail={userEmail} />
      </Popup.Content>
      <Popup.Footer />
    </Popup>
  );
}

const root = document.createElement('div');
document.body.appendChild(root);
ReactDOM.createRoot(root as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <PopupLayout />
    </ThemeProvider>
  </React.StrictMode>,
);
