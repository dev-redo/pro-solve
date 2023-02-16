import React from 'react';
import ReactDOM from 'react-dom/client';
import { theme } from '@src/styles/theme';
import { ThemeProvider } from 'styled-components';
<<<<<<< Updated upstream
import CreateSolutionsButton from '@src/components/button/CreateSolutionsButton';
=======
import CreateSolutionsButton from '@src/components/shared/button/CreateSolutionsButton';
import { getProblemInfo } from '../getProblemInfo';
>>>>>>> Stashed changes

export const createShowSolutionsButton = () => {
  const $selectedLanguage = (
    document.querySelector('div.editor > ul > li.nav-item > a') as HTMLAnchorElement
  ).getAttribute('data-language')!;
  const $problemId = (
    document.querySelector('div.main > div.lesson-content') as HTMLDivElement
  ).getAttribute('data-lesson-id')!;
  const $problemName = (
    document.querySelector('li.algorithm-title') as HTMLLIElement
  ).textContent!.trim();

  const btn = document.createElement('a');
  const root = document.querySelector('div.modal-footer') as HTMLDivElement;
  root.appendChild(btn);
  ReactDOM.createRoot(btn as HTMLElement).render(
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <CreateSolutionsButton
          selectedLanguage={$selectedLanguage}
          problemId={$problemId}
          problemName={$problemName}
        />
      </ThemeProvider>
    </React.StrictMode>,
  );
};
