import { getUserEmailStorage, getSuccessProblemsIdListStorage } from './getUserInfoStorage';

const addSolvedProblemId = async (id: number, isSuccess: boolean) => {
  if (!isSuccess) return;

  const { userEmail } = await getUserEmailStorage();
  const solvedProblem = await getSuccessProblemsIdListStorage(userEmail);

  if (solvedProblem.includes(id)) {
    console.log(`[Pro-Solve] 이전에 성공한 문제입니다. :>> ${id}`);
    return;
  }

  return chrome.storage.local.set({
    [userEmail]: [...solvedProblem, id],
  });
};

export { addSolvedProblemId };
