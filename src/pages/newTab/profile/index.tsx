import React from 'react';
import ReactDOM from 'react-dom/client';
import { RecoilRoot, useRecoilValue } from 'recoil';
import { ThemeProvider } from 'styled-components';
import { theme } from '@src/styles/theme';
import GlobalStyles from '@src/styles/global';

import ProfileTab from './ProfileTab';
import Problems from './Problems';
import Statistics from './Statistics';

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
