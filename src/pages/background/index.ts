import { postCurrentSolution, addSolvedProblemId } from './postCurrentSolution';
import { getAllSolutions } from './getAllSolutions';
import { createSolutionsTab } from './createSolutionsTab';
import { createSuccessProblemTab } from './createSuccessProblemTab';
import { getSuccessProblems, getSuccessProblemIdList } from './getSuccessProblems';

export const createChromeTab = (url: string) =>
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    const tabIndex = tabs[0]!.index;
    chrome.tabs.create({ url, index: tabIndex + 1 });
  });

chrome.storage.local.get(['solvedProblem'], async response => {
  const { solvedProblem } = response;
  chrome.storage.local.set({
    solvedProblem: 'solvedProblem' in response ? solvedProblem : await getSuccessProblemIdList(),
  });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const message = { request, sender, sendResponse };

  if (request.method === 'postCurrentSolution') {
    postCurrentSolution(message).catch(error => {
      console.log('[Pro Solve] 로그인을 하지 않아 업로드가 되지 않습니다!', error);
      sendResponse({ status: false });
    });

    return true;
  }

  if (request.method === 'getAllSolutions') {
    getAllSolutions(message).catch(error => {
      console.log('[Pro Solve] 풀이를 가져오던 중 에러가 발생했습니다!', error);
      sendResponse({ status: false, message: error.message });
    });

    return true;
  }

  if (request.method === 'createSolutionsTab') {
    createSolutionsTab(message);
  }

  if (request.method === 'createSuccessProblemTab') {
    createSuccessProblemTab(message);
  }

  if (request.method === 'getSuccessProblems') {
    getSuccessProblems(message).catch(error => {
      console.log('[Pro Solve] 성공한 받아오는 데 실패했습니다!', error);
      sendResponse({ status: false, message: error.message });
    });

    return true;
  }
});
