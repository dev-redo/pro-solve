import React from 'react';
import ReactDOM from 'react-dom/client';
import styled from 'styled-components';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../styles/theme';

const languageRegex = /(?<=language=\s*)\w*/g;
const problemIdRegex = /(?<=lessons\/\s*)\w+/g;

const href = ([...document.querySelectorAll('.lesson-control-btn > a')] as HTMLAnchorElement[])[1]
  .href;
const selectedLanguage = href.match(languageRegex)![0];
const problemId = href.match(problemIdRegex)![0];
const problemName = ([...document.querySelectorAll('ol.breadcrumb > li')] as HTMLElement[])[2]
  .innerText;

const createSolutionTab = () => {
  chrome.runtime.sendMessage({
    method: 'newTab',
    href: { selectedLanguage, problemId, problemName },
  });
};

const SolutionPage = () => {
  console.log(`언어 | 문제 번호 | 문제 이름 >> ${selectedLanguage}, ${problemId}, ${problemName}`);

  return <SolutionStyle onClick={createSolutionTab}>제출한 모든 풀이</SolutionStyle>;
};

const SolutionStyle = styled.span`
  padding: 0.3125rem 0.8125rem;
  font-size: 0.875rem;
  color: ${props => props.theme.color.white};
  &:hover {
    color: ${props => props.theme.color.white};
  }
`;

const root = document.querySelector('div.result-tab > div#tab') as HTMLDivElement;
const contentScript = document.createElement('button');
contentScript.style.cssText = `
  background-color: ${theme.color.darkGrey};
  margin-left: 0.85rem;
  border-radius: 0.25rem;
  border: none;
`;

root.appendChild(contentScript);
ReactDOM.createRoot(contentScript as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <SolutionPage />
    </ThemeProvider>
  </React.StrictMode>,
);
