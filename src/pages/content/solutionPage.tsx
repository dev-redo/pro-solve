import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../styles/theme';
import CreateSolutionsButton from '../../components/button/CreateSolutionsButton';
import CopyClipBoardButton from '../../components/button/CopyClipBoardButton';

(() => {
  createCodeClipboard();
  createSolutionTabBtn();
})();

function createCodeClipboard() {
  const submissionList = document.querySelectorAll('div.submission__box');
  submissionList.forEach(submission => {
    (submission as HTMLDivElement).style.position = 'relative';
    const code = (submission.querySelector('td.rouge-code') as HTMLTableCellElement)?.innerText;

    const elem = document.createElement('div');
    submission.appendChild(elem);
    ReactDOM.createRoot(elem as HTMLElement).render(
      <React.StrictMode>
        <ThemeProvider theme={theme}>
          <CopyClipBoardButton codeText={code} />
        </ThemeProvider>
      </React.StrictMode>,
    );
  });
}

function createSolutionTabBtn() {
  const languageRegex = /(?<=language=\s*)\w*/g;
  const problemIdRegex = /(?<=lessons\/\s*)\w+/g;

  const href = ([...document.querySelectorAll('.lesson-control-btn > a')] as HTMLAnchorElement[])[1]
    .href;
  const selectedLanguage = href.match(languageRegex)![0];
  const problemId = href.match(problemIdRegex)![0];
  const problemName = ([...document.querySelectorAll('ol.breadcrumb > li')] as HTMLElement[])[2]
    .innerText;

  const root = document.querySelector('div.result-tab > div#tab') as HTMLDivElement;
  const contentScript = document.createElement('div');
  root.appendChild(contentScript);
  ReactDOM.createRoot(contentScript as HTMLElement).render(
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <CreateSolutionsButton
          selectedLanguage={selectedLanguage}
          problemId={problemId}
          problemName={problemName}
        />
      </ThemeProvider>
    </React.StrictMode>,
  );
}
