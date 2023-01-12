import React from 'react';

import { getAllSolutions } from '@src/service/solution/getAllSolutions';
import { useIsLoaded } from '../useIsLoaded';

import { SolutionResponse } from '@src/types/solution';
import { ProblemInfo } from '@src/types/problem/problem';

const useAllSolution = (problemInfo: ProblemInfo) => {
  const { isLoaded, setIsLoaded } = useIsLoaded();
  const [solutions, setSolutions] = React.useState<SolutionResponse>({});

  React.useEffect(() => {
    (async () => {
      const allSolutions = await getAllSolutions(problemInfo);
      setSolutions(allSolutions);
      setIsLoaded(false);
    })();
  }, []);

  return { isLoaded, solutions };
};

export { useAllSolution };