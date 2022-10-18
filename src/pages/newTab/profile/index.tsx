import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../../styles/theme';
import GlobalStyles from '../../../styles/global';
import { fetchRequest } from '../../../utils/fetchRequest';
import { ALL_PROBLEM_URL } from '../../../constants/url';
import { ProblemType, SolvedProblemType, ProblemsCntType } from '../../../types/profile';
import { levels, levelsColor } from '../../../constants/level';
import ProfileTab from './ProfileTab';
import { RecoilRoot, useRecoilValue } from 'recoil';
import { navOption } from '../../../store/profile';
import Statistics from './Statistics';
import Problems from './Problems';

const ProfileTabLayout = () => {
  const [isLoaded, setIsLoaded] = React.useState(true);
  const [allProblems, setAllSolvedProblems] = React.useState<SolvedProblemType>([]);
  const [solvedProblems, setSolvedProblems] = React.useState<SolvedProblemType>([]);
  const selectedItem = useRecoilValue(navOption);

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

  const problemCnt = getProblemsCnt({ allProblems, solvedProblems });
  const solvedLevelCnt = getProblemsLevelList(solvedProblems);
  const chartInfoList = getChartInfoList({ allProblems, solvedProblems });
  return (
    <ProfileTab>
      <ProfileTab.Header />
      <ProfileTab.Nav />
      <ProfileTab.Content isLoaded={isLoaded}>
        {selectedItem === 'MAIN' && (
          <Statistics
            problemCnt={problemCnt}
            solvedLevelCnt={solvedLevelCnt}
            chartInfoList={chartInfoList}
          />
        )}
        {selectedItem === 'PROBLEM' && <Problems solvedProblems={solvedProblems} />}
      </ProfileTab.Content>
      <ProfileTab.Footer />
    </ProfileTab>
  );
};

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

const getProblemsCnt = ({ allProblems, solvedProblems }: ProblemsCntType) => ({
  allCnt: allProblems.length,
  solvedCnt: solvedProblems.length,
});

type LevelListFunc = (problems: SolvedProblemType) => number[];
const getProblemsLevelList: LevelListFunc = (problems: SolvedProblemType) =>
  problems.reduce((prev, { level }) => {
    prev[level] += 1;
    return prev;
  }, new Array(6).fill(0));

const getLevelsInfoList = () => levels.map((level, idx) => ({ level, color: levelsColor[idx] }));

const getChartInfoList = ({ allProblems, solvedProblems }: ProblemsCntType) => {
  const problemsCnt = getProblemsLevelList(allProblems);
  const solvedCnt = getProblemsLevelList(solvedProblems);

  return levels.map((level, idx) => ({
    level,
    color: levelsColor[idx],
    allCnt: problemsCnt[idx],
    solvedCnt: solvedCnt[idx],
  }));
};

const root = document.createElement('div');
document.body.appendChild(root);
ReactDOM.createRoot(root as HTMLElement).render(
  <React.StrictMode>
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <ProfileTabLayout />
      </ThemeProvider>
    </RecoilRoot>
  </React.StrictMode>,
);
