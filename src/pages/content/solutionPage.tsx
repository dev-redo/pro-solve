import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../styles/theme';
import ShowSolutionsButton from '../../components/button/showSolutionsButton';
import CopyClipBoard from '../../components/button/CopyClipBoard';

(() => {
  const submissionList = document.querySelectorAll('div.submission__box');
  submissionList.forEach(submission => {
    (submission as HTMLDivElement).style.position = 'relative';
    const code = (submission.querySelector('td.rouge-code') as HTMLTableCellElement)?.innerText;

    const elem = document.createElement('div');
    submission.appendChild(elem);
    ReactDOM.createRoot(elem as HTMLElement).render(
      <React.StrictMode>
        <ThemeProvider theme={theme}>
          <CopyClipBoard codeText={code} />
        </ThemeProvider>
      </React.StrictMode>,
    );
  });
})();

const languageRegex = /(?<=language=\s*)\w*/g;
const problemIdRegex = /(?<=lessons\/\s*)\w+/g;

const href = ([...document.querySelectorAll('.lesson-control-btn > a')] as HTMLAnchorElement[])[1]
  .href;
const selectedLanguage = href.match(languageRegex)![0];
const problemId = href.match(problemIdRegex)![0];
const problemName = ([...document.querySelectorAll('ol.breadcrumb > li')] as HTMLElement[])[2]
  .innerText;

const SolutionPage = () => {
  console.log(`언어 | 문제 번호 | 문제 이름 >> ${selectedLanguage}, ${problemId}, ${problemName}`);

  return (
    <ShowSolutionsButton
      selectedLanguage={selectedLanguage}
      problemId={problemId}
      problemName={problemName}
    />
  );
};

const root = document.querySelector('div.result-tab > div#tab') as HTMLDivElement;
const contentScript = document.createElement('div');
root.appendChild(contentScript);
ReactDOM.createRoot(contentScript as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <SolutionPage />
    </ThemeProvider>
  </React.StrictMode>,
);
