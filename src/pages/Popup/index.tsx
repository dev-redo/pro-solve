import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../styles/theme';
import GlobalStyles from '../../styles/global';

const Popup = () => {
  return <div>ProSolve</div>;
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
