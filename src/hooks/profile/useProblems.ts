import React from 'react';

import { getAllProblemsList, getSolvedProblemList } from '@src/service/profile';
import { SolvedProblemType } from '@src/types/profile/profile-layout';

export const useProblems = (userEmail: string) => {
  const [isLoaded, setIsLoaded] = React.useState(true);

  const [allProblems, setAllSolvedProblems] = React.useState<SolvedProblemType>([]);
  const [solvedProblems, setSolvedProblems] = React.useState<SolvedProblemType>([]);

  React.useEffect(() => {
    if (!userEmail) {
      return;
    }

    (async () => {
      await setAllProblemsCallback(setAllSolvedProblems);
      await setSolvedProblemsCallback({ userEmail, allProblems, setSolvedProblems });

      setIsLoaded(false);
    })();
  }, [userEmail, allProblems]);

  return {
    isLoaded,
    allProblems,
    solvedProblems,
  };
};

const setAllProblemsCallback = async (
  setAllSolvedProblems: React.Dispatch<React.SetStateAction<SolvedProblemType>>,
) => {
  const allProblems = await getAllProblemsList();
  setAllSolvedProblems(allProblems);
};

interface SolvedProblemsCallback {
  userEmail: string;
  allProblems: SolvedProblemType;
  setSolvedProblems: React.Dispatch<React.SetStateAction<SolvedProblemType>>;
}

const setSolvedProblemsCallback = async ({
  userEmail,
  allProblems,
  setSolvedProblems,
}: SolvedProblemsCallback) => {
  const solvedProblems = await getSolvedProblemList(userEmail as string, allProblems);
  setSolvedProblems(solvedProblems);
};
