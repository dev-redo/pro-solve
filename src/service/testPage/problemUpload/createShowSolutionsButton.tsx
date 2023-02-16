import React from 'react';
import ReactDOM from 'react-dom/client';
import { theme } from '@src/styles/theme';
import { ThemeProvider } from 'styled-components';
import CreateSolutionsButton from '@src/components/shared/button/CreateSolutionsButton';
import { getProblemInfo } from '../getProblemInfo';

export const createShowSolutionsButton = () => {
  const { $selectedLanguage, $problemId, $problemName } = getProblemInfo();

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
