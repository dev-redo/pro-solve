import React from 'react';
import ReactDOM from 'react-dom/client';
import { RecoilRoot, useRecoilValue } from 'recoil';
import { ThemeProvider } from 'styled-components';
import styled from 'styled-components';

import ProfileTab from './ProfileTab';
import Problems from './Problems';
import Statistics from './Statistics';

import { theme } from '@src/styles/theme';
import GlobalStyles from '@src/styles/global';
import { navOption } from '@src/store/profile';
import { useProblems } from '@src/hooks/profile';

const ProfileTabLayout = () => {
  const { isLoggedIn, isLoaded, allProblems, solvedProblems } = useProblems();
  const selectedNavOption = useRecoilValue(navOption);

  return (
    <ProfileTab>
      <ProfileTab.Header />
      <ProfileTab.Nav />
      <ProfileTab.Content isLoggedIn={isLoggedIn} isLoaded={isLoaded}>
        {selectedNavOption === 'MAIN' && (
          <Statistics allProblems={allProblems} solvedProblems={solvedProblems} />
        )}
        {selectedNavOption === 'PROBLEM' && <Problems solvedProblems={solvedProblems} />}
      </ProfileTab.Content>
      <ProfileTab.Footer />
    </ProfileTab>
  );
};

const ContainerStyle = styled.div`
  background-color: ${({ theme }) => theme.color.whiter};
  min-width: 768px;
  user-select: none;
`;

const root = document.createElement('div');
root.style.cssText = `
  background-color: ${theme.color.whiter};
  height: 100vh;
`;
document.body.appendChild(root);
ReactDOM.createRoot(root as HTMLElement).render(
  <React.StrictMode>
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <ProfileTabLayout />
      </ThemeProvider>
    </RecoilRoot>
  </React.StrictMode>,
);
