import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../../styles/theme';
import GlobalStyles from '../../../styles/global';
import { ALL_PROBLEM_URL } from '../../../constants/url';
import { fetchRequest } from '../../../utils/fetchRequest';
import {
  ProblemType,
  SolvedProblemType,
  SolvedProblemProps,
  ProblemsCntType,
  SelectNameType,
  SortType,
} from '../../../types/profile';
import { levels, levelsColor } from '../../../constants/level';
import ProfileTab from './ProfileTab';
import { RecoilRoot, useRecoilValue } from 'recoil';
import { navOption, sortOption } from '../../../store/profile';
import Statistics from './Statistics';
import Problems from './Problems';
import { getUserEmail } from '../../../api/solution/getUserEmail';

document.title = '프로솔브 - 나의 풀이 페이지';

const ProfileTabLayout = () => {
  const [isLoaded, setIsLoaded] = React.useState(true);
  const [allProblems, setAllSolvedProblems] = React.useState<SolvedProblemType>([]);
  const [solvedProblems, setSolvedProblems] = React.useState<SolvedProblemType>([]);
  const selectedItem = useRecoilValue(navOption);

  React.useEffect(() => {
    (async () => {
      const allProblems = await getAllProblemsList();
      setAllSolvedProblems(allProblems);

      const solvedProblemIdList = await getSolvedProblemIdList();
      const solvedProblems = await getSolvedProblemList(allProblems, solvedProblemIdList);
      setSolvedProblems(solvedProblems);

      setIsLoaded(false);
    })();
  }, []);

  const problemCnt = getProblemsCnt({ allProblems, solvedProblems });
  const solvedLevelCnt = getProblemsLevelList(solvedProblems);
  const chartInfoList = getChartInfoList({ allProblems, solvedProblems });
  const filteredSolvedProblems = getFilteredSolvedProblems({ solvedProblems });
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
        {selectedItem === 'PROBLEM' && <Problems solvedProblems={filteredSolvedProblems} />}
      </ProfileTab.Content>
      <ProfileTab.Footer />
    </ProfileTab>
  );
};

const getAllProblemsList = async () =>
  await fetchRequest({
    url: ALL_PROBLEM_URL,
  });

const getSolvedProblemIdList = async () => {
  const userEmail = await getUserEmail();

  return (await chrome.storage.local.get([userEmail]))[userEmail];
};

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

const getFilteredSolvedProblems = ({ solvedProblems }: SolvedProblemProps) => {
  const sortType = useRecoilValue(sortOption);
  const { type, isAscending } = sortType as SortType;

  return filterSolvedProblems({ solvedProblems, type, isAscending });
};

type FilterProps = {
  solvedProblems: SolvedProblemType;
  type: SelectNameType;
  isAscending: boolean;
};

const filterSolvedProblems = ({ solvedProblems, type, isAscending }: FilterProps) =>
  solvedProblems.sort((prev, curr) => {
    if (isAscending) return prev[type] - curr[type];
    return curr[type] - prev[type];
  });

const root = document.createElement('div');
root.style.cssText = `
  background-color: ${theme.color.whiter};
  height: 100vh;
`;
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
