import React from 'react';
import ReactDOM from 'react-dom/client';
import { RecoilRoot, useRecoilValue } from 'recoil';
import { ThemeProvider } from 'styled-components';
import { theme } from '@src/styles/theme';
import GlobalStyles from '@src/styles/global';

import ProfileTab from './ProfileTab';
import Problems from './Problems';
import Statistics from './Statistics';

import { fetchRequest } from '@src/utils/fetchRequest';
import { setUserInfoStorage } from '@src/api/solution/setUserInfoStorage';
import { getSuccessProblemsIdListStorage } from '@src/api/solution/getUserInfoStorage';
import { getUserEmail } from '@src/api/solution/getUserEmail';
import { ALL_PROBLEM_URL } from '@src/constants/url';
import { levels, levelsColor } from '@src/constants/level';
import {
  ProblemType,
  SolvedProblemType,
  ProblemsCntType,
  SortType,
  LevelListFunc,
} from '@src/types/profile/profile-layout';
import { navOption, sortOption } from '@src/store/profile';
import { problemTitleOption } from '@src/store/select';

document.title = '프로솔브 - 나의 풀이 페이지';

const ProfileTabLayout = () => {
  const [isLoaded, setIsLoaded] = React.useState(true);
  const [isLoggedIn, setIsLoggedIn] = React.useState(true);

  const [allProblems, setAllSolvedProblems] = React.useState<SolvedProblemType>([]);
  const [solvedProblems, setSolvedProblems] = React.useState<SolvedProblemType>([]);
  const selectedItem = useRecoilValue(navOption);

  React.useEffect(() => {
    (async () => {
      await setUserInfoStorage();

      const userEmail = await getUserEmail();
      if (userEmail === undefined) {
        setIsLoggedIn(false);
        return;
      }

      const allProblems = await getAllProblemsList();
      setAllSolvedProblems(allProblems);

      const solvedProblems = await getSolvedProblemList(userEmail, allProblems);
      setSolvedProblems(solvedProblems);

      setIsLoaded(false);
    })();
  }, []);

  const problemCnt = getProblemsCnt({ allProblems, solvedProblems });
  const solvedLevelCnt = getProblemsLevelList(solvedProblems);
  const chartInfoList = getChartInfoList({ allProblems, solvedProblems });
  const filteredSolvedProblems = getFilteredSolvedProblems(solvedProblems);
  const partTitleList = getPartTitleListOfSolvedProblems(solvedProblems);
  return (
    <ProfileTab>
      <ProfileTab.Header />
      <ProfileTab.Nav />
      <ProfileTab.Content isLoggedIn={isLoggedIn} isLoaded={isLoaded}>
        {selectedItem === 'MAIN' && (
          <Statistics
            problemCnt={problemCnt}
            solvedLevelCnt={solvedLevelCnt}
            chartInfoList={chartInfoList}
          />
        )}
        {selectedItem === 'PROBLEM' && (
          <Problems solvedProblems={filteredSolvedProblems} partTitleList={partTitleList} />
        )}
      </ProfileTab.Content>
      <ProfileTab.Footer />
    </ProfileTab>
  );
};

const getAllProblemsList = async () =>
  await fetchRequest({
    url: ALL_PROBLEM_URL,
  });

const getSolvedProblemList = async (userEmail: string, allProblems: SolvedProblemType) => {
  const solvedProblemIdList = await getSuccessProblemsIdListStorage(userEmail);

  return allProblems.reduce((prev: SolvedProblemType, curr: ProblemType) => {
    solvedProblemIdList.forEach(problem => {
      if (problem === curr.id) {
        prev.push(curr);
      }
    });
    return prev;
  }, []);
};

const getProblemsCnt = ({ allProblems, solvedProblems }: ProblemsCntType) => ({
  allCnt: allProblems.length,
  solvedCnt: solvedProblems.length,
});

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

const getPartTitleListOfSolvedProblems = (solvedProblems: SolvedProblemType) => {
  const problemsTitleMap = solvedProblems.reduce<Record<string, number>>(
    (partTitleList, { partTitle }) => {
      partTitleList[partTitle] = (partTitleList[partTitle] ?? 0) + 1;
      return partTitleList;
    },
    {},
  );

  const partTitleList = Object.entries(problemsTitleMap)
    .sort(([prevTitle, prevCnt], [currTitle, currCnt]) => currCnt - prevCnt)
    .map(([title, cnt]) => `${title} (${cnt})`);

  const allProblemTitle = `전체 문제 (${solvedProblems.length})`;
  return [allProblemTitle, ...partTitleList];
};

const getFilteredSolvedProblems = (solvedProblems: SolvedProblemType) => {
  const sortedSolvedProblems = sortSolvedProblems(solvedProblems);
  return filterSolvedProblemsByPartTitle(sortedSolvedProblems);
};

const sortSolvedProblems = (solvedProblems: SolvedProblemType) => {
  const sortType = useRecoilValue(sortOption);
  const { type, isAscending } = sortType as SortType;

  return solvedProblems.sort((prevProblem, currProblem) => {
    if (isAscending) return prevProblem[type] - currProblem[type];
    return currProblem[type] - prevProblem[type];
  });
};

const filterSolvedProblemsByPartTitle = (solvedProblems: SolvedProblemType) => {
  const selectedPartTitle = useRecoilValue(problemTitleOption);

  if (selectedPartTitle.includes('전체 문제')) return solvedProblems;
  return solvedProblems.filter(({ partTitle }) => selectedPartTitle.includes(partTitle));
};

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
