import React from 'react';
import ReactDOM from 'react-dom/client';
import { theme } from '@src/styles/theme';
import { ThemeProvider } from 'styled-components';
import { getProblemInfo } from '../getProblemInfo';
import CreateMemoListButton from '@src/components/domain/testPage/CreateMemoListButton';

export const createMemoTabButton = () => {
  const { $problemId, $problemName } = getProblemInfo();

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
