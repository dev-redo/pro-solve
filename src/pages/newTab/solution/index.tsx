import React from 'react';
import ReactDOM from 'react-dom/client';
import styled from 'styled-components';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../../styles/theme';
import GlobalStyles from '../../../styles/global';
import GlobalFonts from '../../../styles/font';
import LogoWhite from '../../../../assets/images/logo-white.png';
import ArrowRight from '../../../../assets/icons/ArrowRight.svg';
import { getAllSolutions } from '../../../hooks/getAllSolutions';

const languageRegex = /&language=(.*)/;
const problemIdRegex = /num=(.*?)&name/;
const problemNameRegex = /name=(.*?)&language/;

const href = window.location.href;
const selectedLanguage = href.match(languageRegex)![1];
const problemId = href.match(problemIdRegex)![1];
const problemName = decodeURI(href.match(problemNameRegex)![1]);

const SolutionTabLayout = () => {
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
      <HeaderStyle>
        <img src={LogoWhite} />
        <div>
          <span>제출한 모든 풀이</span>
          <span>
            <ArrowRight />
          </span>
          <span>
            [{selectedLanguage}] {problemName}
          </span>
        </div>
      </HeaderStyle>
      <div>{JSON.stringify(solutions)}</div>
      <div>
        {selectedLanguage}, {problemId}, {problemName}
      </div>
    </div>
  );
};

const HeaderStyle = styled.div`
  position: sticky;
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0.375rem 1rem;
  background-color: ${props => props.theme.color.indigo};
  color: ${props => props.theme.color.greyBlue};
  font-family: 'NanumSquareRegular', sans-serif;
  & > img {
    width: 1.5rem;
    height: 1.5rem;
  }
  & > div {
    display: flex;
    align-items: center;
    margin-left: 0.85rem;
    padding: 0.375rem 0;
    gap: 0.3rem;
  }
  svg {
    height: 1.5rem;
  }
`;

const root = document.createElement('div');
document.body.appendChild(root);
ReactDOM.createRoot(root as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <GlobalFonts />
      <SolutionTabLayout />
    </ThemeProvider>
  </React.StrictMode>,
);
