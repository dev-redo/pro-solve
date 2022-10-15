import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../../styles/theme';
import styled from 'styled-components';
import GlobalStyles from '../../../styles/global';
import { fetchRequest } from '../../../utils/fetchRequest';
import { ALL_PROBLEM_URL } from '../../../constants/url';
import { ProblemType, SolvedProblemType } from '../../../types/profile';
import ProfileTab from './ProfileTab';
import DonutChart from '../../../components/chart/DonutChart';
import LineChart from '../../../components/chart/LineChart';

const userNameRegex = /name=(.*)&img/;
const userImgRegex = /&img=(.*)/;

const href = window.location.href;
const userName = decodeURI(href.match(userNameRegex)![1]);
const userImg = decodeURI(href.match(userImgRegex)![1]);

const ProfileTabLayout = () => {
  const [isLoaded, setIsLoaded] = React.useState(true);
  const [allProblems, setAllSolvedProblems] = React.useState<SolvedProblemType>([]);
  const [solvedProblems, setSolvedProblems] = React.useState<SolvedProblemType>([]);

  React.useEffect(() => {
    (async () => {
      const allProblems = await getAllProblemsList();
      setAllSolvedProblems(allProblems);

      const { solvedProblem } = await chrome.storage.local.get(['solvedProblem']);
      const solvedProblemList = await getSolvedProblemList(allProblems, solvedProblem);
      setSolvedProblems(solvedProblemList);

      setIsLoaded(false);
    })();
  }, []);

  return (
    <>
      <ProfileTab>
        <ProfileTab.Header userName={userName} />
        <ProfileTab.UserInfo userName={userName} userImg={userImg} />
      </ProfileTab>
      <div>{JSON.stringify(solvedProblems)}</div>
      <DonutStyle>
        <DonutChart color="#0078FF" percent={0.65} size="8rem" />
      </DonutStyle>
      <LineChart />
    </>
  );
};

const DonutStyle = styled.div`
  display: flex;
  padding: 10px;
`;

const getAllProblemsList = async () =>
  await fetchRequest({
    url: ALL_PROBLEM_URL,
  });

const getSolvedProblemList = async (
  allProblems: SolvedProblemType,
  solvedProblemIdList: number[],
) =>
  allProblems.reduce((prev: SolvedProblemType, curr: ProblemType) => {
    solvedProblemIdList.forEach(problem => {
      if (problem === curr.id) {
        prev.push(curr);
      }
    });
    return prev;
  }, []);

const root = document.createElement('div');
document.body.appendChild(root);
ReactDOM.createRoot(root as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <ProfileTabLayout />
    </ThemeProvider>
  </React.StrictMode>,
);
