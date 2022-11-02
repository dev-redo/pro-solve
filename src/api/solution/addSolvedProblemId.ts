const addSolvedProblemId = async (id: number, isSuccess: boolean) => {
  if (!isSuccess) return;

  const { userEmail } = await chrome.storage.local.get('userEmail');
  const solvedProblem = (await chrome.storage.local.get([userEmail]))[userEmail];

  if (solvedProblem.includes(id)) {
    console.log(`[Pro-Solve] 이전에 성공한 문제입니다. :>> ${id}`);
    return;
  }

  return chrome.storage.local.set({
    [userEmail]: [...solvedProblem, id],
  });
};

export { addSolvedProblemId };
