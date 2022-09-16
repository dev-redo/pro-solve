import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../styles/theme';
import GlobalStyles from '../../styles/global';
import { SuccessResponse, FailedResponse } from '../../types/code';
import { getAllSolutions } from '../../hooks/getAllSolutions';

function SolutionPage() {
  // TODO: Solution type 지정
  const [solutions, setSolutions] = React.useState<SuccessResponse | FailedResponse>({});

  React.useEffect(() => {
    (async () => {
      const allSolutions = await getAllSolutions();
      setSolutions(allSolutions);
    })();
  }, []);

  // 로딩중 = 스켈레톤 ui (마지막에 구현)

  // [로그인 X]: status = false
  // 내가 제출한 코드 풀이테이블 + 로그인을 해주세요 문구 띄우기

  // [로그인 O]
  // 풀이 테이블 띄우기

  return (
    <div>
      <span>Solution</span>
      <span>{JSON.stringify(solutions)}</span>
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
