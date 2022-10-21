import { getSuccessProblemIdList } from './getSuccessProblems';

const setSolvedProblems = () => {
  chrome.storage.local.get(['solvedProblem'], async response => {
    chrome.storage.local.set({
      solvedProblem: await getSuccessProblemIdList(),
    });
  });
};

export { setSolvedProblems };
