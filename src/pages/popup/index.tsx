import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';

import { theme } from '@src/styles/theme';
import GlobalStyles from '@src/styles/global';
import { useAuth } from '@src/hooks/popup/useAuth';

import Popup from './Popup';

function PopupLayout() {
  const { isLoaded, userEmail } = useAuth();

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
