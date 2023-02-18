import { Message } from '@src/types/global';
import { createChromeTab } from './createChromeTab';

type Problem = {
  problemId: string;
  problemName: string;
};

const createMemoTab = ({ request }: Message) => {
  const problem = request.href;
  const url = getSolutionsTabUrl(chrome.runtime.id, problem);

  createChromeTab(url);
};

const getSolutionsTabUrl = (runtimeId: string, { problemId, problemName }: Problem) =>
  `chrome-extension://${runtimeId}/memoTab.html?num=${problemId}&name=${problemName}`;

export { createMemoTab };
