import React from 'react';
import { useUserEmail } from './useUserEmail';

import { getAllProblemsList, getSolvedProblemList } from '@src/service/profile';
import { SolvedProblemType } from '@src/types/profile/profile-layout';
import { useIsLoaded } from '../useIsLoaded';

export const useProblems = () => {
  const { isLoggedIn, userEmail } = useUserEmail();
  const { isLoaded, setIsLoaded } = useIsLoaded();

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
