import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import styled from 'styled-components';
import '@src/styles/font.css';

import { theme } from '@src/styles/theme';
import GlobalStyles from '@src/styles/global';
import { useAuth } from '@src/hooks/popup/useAuth';

import Title from './Title';
import Login from './Login';
import Footer from './Footer';

const Popup = () => {
  const { isLoaded, userEmail } = useAuth();
  return (
    <ContainerStyle>
      <ContentStyle>
        <Title />
        <Login isLoaded={isLoaded} userEmail={userEmail} />
      </ContentStyle>
      <Footer />
    </ContainerStyle>
  );
};

export default Popup;

export const ContainerStyle = styled.div`
  display: flex;
  flex-direction: column;
  width: 25rem;
  height: 15rem;
  padding: 1.5rem 2rem;
  gap: 1rem;
  font-family: 'Noto Sans KR', sans-serif;
`;

export const ContentStyle = styled.div`
  height: 100%;
`;

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
