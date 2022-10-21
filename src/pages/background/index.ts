import { postCurrentSolution } from './postCurrentSolution';
import { getAllSolutions } from './getAllSolutions';
import { createSolutionsTab } from './createSolutionsTab';
import { createSuccessProblemTab } from './createSuccessProblemTab';
import { setSolvedProblems } from './setSolvedProblems';

export const createChromeTab = (url: string) =>
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    const tabIndex = tabs[0]!.index;
    chrome.tabs.create({ url, index: tabIndex + 1 });
  });

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  setSolvedProblems();
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
    createSuccessProblemTab();
  }
});
