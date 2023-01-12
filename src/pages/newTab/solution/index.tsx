import React from 'react';
import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components';

import { theme } from '@src/styles/theme';
import GlobalStyles from '@src/styles/global';
import { useAllSolution } from '@src/hooks/solution/useAllSolution';
import { SelectedLanguage } from '@src/types/problem/problem';

import SolutionTab from './SolutionTab';

const languageRegex = /&language=(.*)/;
const problemIdRegex = /num=(.*?)&name/;
const problemNameRegex = /name=(.*?)&language/;

const href = window.location.href;
const selectedLanguage = href.match(languageRegex)![1] as SelectedLanguage;
const problemId = href.match(problemIdRegex)![1];
const problemName = decodeURI(href.match(problemNameRegex)![1]);
document.title = `프로솔브 - ${problemName}`;

const SolutionTabLayout = () => {
  const { isLoaded, solutions } = useAllSolution({ selectedLanguage, problemId });

  return (
    <SolutionTab>
      <SolutionTab.Header selectedLanguage={selectedLanguage} problemName={problemName} />
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
