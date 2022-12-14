import React from 'react';
import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components';
import { theme } from '@src/styles/theme';
import GlobalStyles from '@src/styles/global';
import { SolutionResponse } from '@src/types/solution';
import SolutionTab from './SolutionTab';

const languageRegex = /&language=(.*)/;
const problemIdRegex = /num=(.*?)&name/;
const problemNameRegex = /name=(.*?)&language/;

const href = window.location.href;
const selectedLanguage = href.match(languageRegex)![1];
const problemId = href.match(problemIdRegex)![1];
const problemName = decodeURI(href.match(problemNameRegex)![1]);
document.title = `프로솔브 - ${problemName}`;

const SolutionTabLayout = () => {
  const [isLoaded, setIsLoaded] = React.useState(true);
  const [solutions, setSolutions] = React.useState<SolutionResponse>({});

  React.useEffect(() => {
    (async () => {
      const allSolutions = await getAllSolutions({ selectedLanguage, problemId });
      setSolutions(allSolutions);
      setIsLoaded(false);
    })();
  }, []);

  return (
    <SolutionTab>
      <SolutionTab.Header selectedLanguage={selectedLanguage} problemName={problemName} />
      <SolutionTab.Select isLoaded={isLoaded} />
      <SolutionTab.Content isLoaded={isLoaded} solutions={solutions} />
    </SolutionTab>
  );
};

interface HrefProps {
  selectedLanguage: string;
  problemId: string;
}
type GetAllSolutionFn = ({ selectedLanguage, problemId }: HrefProps) => Promise<SolutionResponse>;
const getAllSolutions: GetAllSolutionFn = async ({ selectedLanguage, problemId }: HrefProps) => {
  console.log(`[Pro Solve] 문제 번호:>> ${problemId} 선택한 언어:>> ${selectedLanguage}`);

  const allSolutions = await new Promise<SolutionResponse>(resolve => {
    chrome.runtime.sendMessage(
      {
        method: 'getAllSolutions',
        data: {
          problemId,
          selectedLanguage,
        },
      },
      (response: SolutionResponse) => {
        resolve(response);
        console.log('[Pro Solve] 풀이한 코드 List :>>', response);
      },
    );
  });

  return allSolutions;
};

const root = document.createElement('div');
document.body.appendChild(root);
ReactDOM.createRoot(root as HTMLElement).render(
  <React.StrictMode>
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <SolutionTabLayout />
      </ThemeProvider>
    </RecoilRoot>
  </React.StrictMode>,
);
