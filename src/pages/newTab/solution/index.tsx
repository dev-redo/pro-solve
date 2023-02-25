import React from 'react';
import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components';
import styled from 'styled-components';

import { theme } from '@src/styles/theme';
import GlobalStyles from '@src/styles/global';

import { getQueryParams } from '@src/utils/location/getQueryParams';
import { useAllSolution } from '@src/hooks/solution/useAllSolution';
import { SelectedLanguage } from '@src/types/problem/problem';

import Header from './Header';
import SelectList from './SelectList';
import Content from './Content';

const { num, name, language } = getQueryParams();
document.title = `프로솔브 - ${name}`;

const SolutionTab = () => {
  const { isLoaded, solutions } = useAllSolution({
    selectedLanguage: language as SelectedLanguage,
    problemId: num,
  });

  return (
    <ContainerStyle>
      <Header selectedLanguage={language} problemName={name} />
      <SelectList isLoaded={isLoaded} />
      <Content isLoaded={isLoaded} solutions={solutions} />
    </ContainerStyle>
  );
};

export default SolutionTab;

const root = document.createElement('div');
document.body.appendChild(root);
ReactDOM.createRoot(root as HTMLElement).render(
  <React.StrictMode>
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <SolutionTab />
      </ThemeProvider>
    </RecoilRoot>
  </React.StrictMode>,
);

export const ContainerStyle = styled.div`
  height: 100%;
  font-family: 'Noto Sans KR', sans-serif;
`;
