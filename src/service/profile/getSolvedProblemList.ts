import { getSuccessProblemsIdListStorage } from '@src/api/solution/getUserInfoStorage';
import { SolvedProblemType, ProblemType } from '@src/types/profile/profile-layout';

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

export { getSolvedProblemList };
