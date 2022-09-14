const btn = document.createElement('button');
btn.textContent = 'Login';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../styles/theme';
import GlobalStyles from '../../styles/global';
import { SuccessResponse, FailedResponse } from '../../types/code';

function SolutionPage() {
  // TODO: useState type 지정
  const [solutions, setSolutions] = React.useState<SuccessResponse | FailedResponse>({});

  React.useEffect(() => {
    async function getAllSolutions() {
      const languageRegex = /(?<=language=\s*)\w*(?=\&type=my)/g;
      const problemIdRegex = /lessons\/(.+?)\/solution/;

      const href = window.location.href;
      const selectedLanguage = href.match(languageRegex)![0];
      const [_, problemId] = href.match(problemIdRegex)!;
      console.log(`[Pro Solve] 문제 번호:>> ${problemId} 선택한 언어:>> ${selectedLanguage}`);

      // TODO: promise type 지정
      const allSolutions = await new Promise(resolve => {
        chrome.runtime.sendMessage(
          {
            method: 'getAllSolutions',
            data: {
              problemId,
              selectedLanguage,
            },
          },
          response => {
            resolve(response);
            console.log('[Pro Solve] 풀이한 코드 List :>>', response);
          },
        );
      });

      setSolutions(allSolutions);
    }

    getAllSolutions();
  }, []);
  return (
    <div>
      <span>Solution</span>
    </div>
  );
}

const root = document.querySelector('div.main > div.container') as HTMLDivElement;
const contentScript = document.createElement('div');
root.appendChild(contentScript);
ReactDOM.createRoot(contentScript as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <SolutionPage />
    </ThemeProvider>
  </React.StrictMode>,
);
