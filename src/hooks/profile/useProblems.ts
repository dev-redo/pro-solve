import React from 'react';
import { useUserEmail } from './useUserEmail';

import { getAllProblemsList, getSolvedProblemList } from '@src/service/profile';
import { SolvedProblemType } from '@src/types/profile/profile-layout';

export const useProblems = () => {
  const { isLoggedIn, userEmail } = useUserEmail();
  // TODO: useIsLoaded로 변경
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [allProblems, setAllSolvedProblems] = React.useState<SolvedProblemType>([]);
  const [solvedProblems, setSolvedProblems] = React.useState<SolvedProblemType>([]);

  React.useEffect(() => {
    (async () => {
      if (!userEmail) {
        return;
      }

      const allProblems = await getAllProblemsList();
      setAllSolvedProblems(allProblems);

      const solvedProblems = await getSolvedProblemList(userEmail, allProblems);
      setSolvedProblems(solvedProblems);

      setIsLoaded(true);
    })();
  }, [userEmail]);

  return {
    isLoggedIn,
    isLoaded,
    allProblems,
    solvedProblems,
  };
};
