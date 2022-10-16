import { createChromeTab } from './index';

const createSuccessProblemTab = async () => {
  const url = getAllSuccessProblemTabUrl(chrome.runtime.id);
  createChromeTab(url);
};

const getAllSuccessProblemTabUrl = (runtimeId: string) =>
  `chrome-extension://${runtimeId}/profileTab.html`;

export { createSuccessProblemTab };
