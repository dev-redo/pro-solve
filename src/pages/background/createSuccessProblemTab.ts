import { fetchRequest } from '../../utils/fetchRequest';
import { PROFILE_URL as url } from '../../constants/url';
import { Message } from '../../types/global';
import { createChromeTab } from './index';

const createSuccessProblemTab = async () => {
  const url = getAllSuccessProblemTabUrl(chrome.runtime.id);
  createChromeTab(url);
};

const getAllSuccessProblemTabUrl = (runtimeId: string) =>
  `chrome-extension://${runtimeId}/profileTab.html`;

export { createSuccessProblemTab };
