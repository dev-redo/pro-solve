import { Message } from '../../types/global';
import { createChromeTab } from './createChromeTab';

type Problem = {
  problemId: string;
  problemName: string;
  selectedLanguage: string;
};

const createSolutionsTab = ({ request }: Message) => {
  const problem = request.href;
  const url = getSolutionsTabUrl(chrome.runtime.id, problem);

  createChromeTab(url);
};

const getSolutionsTabUrl = (
  runtimeId: string,
  { problemId, problemName, selectedLanguage }: Problem,
) =>
  `chrome-extension://${runtimeId}/solutionTab.html?num=${problemId}&name=${problemName}&language=${selectedLanguage}`;

export { createSolutionsTab };
