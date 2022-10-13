import { Message } from '../../types/global';

type Problem = {
  problemId: string;
  problemName: string;
  selectedLanguage: string;
};

const createSolutionsTab = ({ request }: Message) => {
  const problem = request.href;
  const url = getSolutionsTabUrl(chrome.runtime.id, problem);

  openSolutionsTab(url);
};

const getSolutionsTabUrl = (
  runtimeId: string,
  { problemId, problemName, selectedLanguage }: Problem,
) =>
  `chrome-extension://${runtimeId}/solutionTab.html?num=${problemId}&name=${problemName}&language=${selectedLanguage}`;

const openSolutionsTab = (url: string) =>
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    const tabIndex = tabs[0]!.index;
    chrome.tabs.create({ url, index: tabIndex + 1 });
  });

export { createSolutionsTab };
