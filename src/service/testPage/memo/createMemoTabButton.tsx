import React from 'react';
import ReactDOM from 'react-dom/client';
import { theme } from '@src/styles/theme';
import { ThemeProvider } from 'styled-components';
import CreateMemoListButton from '@src/service/testPage/memo/CreateMemoListButton';

export const createMemoTabButton = () => {
  const $problemId = (
    document.querySelector('div.main > div.lesson-content') as HTMLDivElement
  ).getAttribute('data-lesson-id')!;
  const $problemName = (
    document.querySelector('li.algorithm-title') as HTMLLIElement
  ).textContent!.trim();

  const btn = document.createElement('a');
  const root = document.querySelector('div.challenge-settings') as HTMLDivElement;
  root.prepend(btn);
  ReactDOM.createRoot(btn as HTMLElement).render(
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <CreateMemoListButton problemId={$problemId} problemName={$problemName} />
      </ThemeProvider>
    </React.StrictMode>,
  );
};
