import React from 'react';
import ReactDOM from 'react-dom/client';
import { RecoilRoot, useRecoilValue } from 'recoil';
import { ThemeProvider } from 'styled-components';
import { theme } from '@src/styles/theme';
import GlobalStyles from '@src/styles/global';

import ProfileTab from './ProfileTab';
import Problems from './Problems';
import Statistics from './Statistics';

import { setUserInfoStorage } from '@src/api/solution/setUserInfoStorage';
import { getUserEmail } from '@src/api/solution/getUserEmail';
import { SolvedProblemType } from '@src/types/profile/profile-layout';
import { navOption } from '@src/store/profile';
import {
  getAllProblemsList,
  getChartInfoList,
  getFilteredSolvedProblems,
  getPartTitleListOfSolvedProblems,
  getProblemsCnt,
  getProblemsLevelList,
  getSolvedProblemList,
} from '@src/service/profile';

const ProfileTabLayout = () => {
  const [isLoaded, setIsLoaded] = React.useState(true);
  const [isLoggedIn, setIsLoggedIn] = React.useState(true);

  const [allProblems, setAllSolvedProblems] = React.useState<SolvedProblemType>([]);
  const [solvedProblems, setSolvedProblems] = React.useState<SolvedProblemType>([]);
  const selectedNavOption = useRecoilValue(navOption);

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
        {selectedNavOption === 'MAIN' && (
          <Statistics
            problemCnt={problemCnt}
            solvedLevelCnt={solvedLevelCnt}
            chartInfoList={chartInfoList}
          />
        )}
        {selectedNavOption === 'PROBLEM' && (
          <Problems
            allSolvedCnt={solvedProblems.length}
            solvedProblems={filteredSolvedProblems}
            partTitleList={partTitleList}
          />
        )}
      </ProfileTab.Content>
      <ProfileTab.Footer />
    </ProfileTab>
  );
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
