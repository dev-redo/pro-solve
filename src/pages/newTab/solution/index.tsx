import React from 'react';
import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components';

import { theme } from '@src/styles/theme';
import GlobalStyles from '@src/styles/global';

import { getQueryParams } from '@src/utils/location/getQueryParams';
import { useAllSolution } from '@src/hooks/solution/useAllSolution';
import { SelectedLanguage } from '@src/types/problem/problem';

import SolutionTab from './SolutionTab';

const { num, name, language } = getQueryParams();
document.title = `프로솔브 - ${name}`;

const SolutionTabLayout = () => {
  const { isLoaded, solutions } = useAllSolution({
    selectedLanguage: language as SelectedLanguage,
    problemId: num,
  });

  return (
    <SolutionTab>
      <SolutionTab.Header selectedLanguage={language} problemName={name} />
      <SolutionTab.Select isLoaded={isLoaded} />
      <SolutionTab.Content isLoaded={isLoaded} solutions={solutions} />
    </SolutionTab>
  );
};

const root = document.createElement('div');
document.body.appendChild(root);
ReactDOM.createRoot(root as HTMLElement).render(
  <React.StrictMode>
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <SolutionTabLayout />
      </ThemeProvider>
    </RecoilRoot>
  </React.StrictMode>,
);
