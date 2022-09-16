import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../styles/theme';
import GlobalStyles from '../../styles/global';
import GlobalFonts from '../../styles/font';
import { getAllSolutions } from '../../hooks/getAllSolutions';

const languageRegex = /&language=(.*)/;
const problemIdRegex = /num=(.*?)&name/;
const problemNameRegex = /name=(.*?)&language/;

const href = window.location.href;
const selectedLanguage = href.match(languageRegex)![1];
const problemId = href.match(problemIdRegex)![1];
const problemName = decodeURI(href.match(problemNameRegex)![1]);

const NewTab = () => {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [solutions, setSolutions] = React.useState({});

  React.useEffect(() => {
    (async () => {
      const allSolutions = await getAllSolutions({ selectedLanguage, problemId });
      setSolutions(allSolutions);
      setIsLoaded(true);
    })();
  }, []);

  return (
    <div>
      <div>{JSON.stringify(solutions)}</div>
      <div>
        {selectedLanguage}, {problemId}, {problemName}
      </div>
    </div>
  );
};

const root = document.createElement('div');
document.body.appendChild(root);
ReactDOM.createRoot(root as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <GlobalFonts />
      <NewTab />
    </ThemeProvider>
  </React.StrictMode>,
);
