import { getUserEmail } from './getUserEmail';

const addSolvedProblemId = async (id: number, isSuccess: boolean) => {
  if (!isSuccess) return;

  const userEmail = await getUserEmail();

  chrome.storage.local.get([userEmail], async response => {
    const solvedProblem = response[userEmail];
    console.log('[Pro-Solve] 제출한 풀이 Id List :>>', solvedProblem);

    if (solvedProblem.includes(id)) {
      console.log(`[Pro-Solve] 이전에 성공한 문제입니다. :>> ${id}`);
      return;
    }

    chrome.storage.local.set({
      [userEmail]: [...solvedProblem, id],
    });
  });
};

export { addSolvedProblemId };
