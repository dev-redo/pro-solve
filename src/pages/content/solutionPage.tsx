import React from 'react';
import ReactDOM from 'react-dom/client';
import styled from 'styled-components';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../styles/theme';

const languageRegex = /(?<=language=\s*)\w*(?=\&type=)/g;
const problemIdRegex = /lessons\/(.+?)\/solution/;

const href = window.location.href;
const selectedLanguage = href.match(languageRegex)![0];
const [_, problemId] = href.match(problemIdRegex)!;
const problemName = ([...document.querySelectorAll('ol.breadcrumb > li')] as HTMLElement[])[2]
  .innerText;

const createSolutionTab = () => {
  chrome.runtime.sendMessage({
    method: 'newTab',
    href: { selectedLanguage, problemId, problemName },
  });
};

const SolutionPage = () => {
  return <SolutionStyle onClick={createSolutionTab}>제출한 모든 풀이</SolutionStyle>;
};

const SolutionStyle = styled.a`
  padding: 0.3125rem 0.8125rem;
  font-size: 0.875rem;
  color: ${props => props.theme.color.white};
`;

const root = document.querySelector('div.result-tab > div#tab') as HTMLDivElement;
const contentScript = document.createElement('button');
contentScript.style.backgroundColor = theme.color.darkGrey;
contentScript.style.marginLeft = '0.85rem';
contentScript.style.borderRadius = '0.25rem';

root.appendChild(contentScript);
ReactDOM.createRoot(contentScript as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <SolutionPage />
    </ThemeProvider>
  </React.StrictMode>,
);
