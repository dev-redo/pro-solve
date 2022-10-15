import { Message } from '../../types/global';
import { createChromeTab } from './index';

type UserInfoType = {
  userName: string;
  userImg: string;
};

const createSuccessProblemTab = async ({ request }: Message) => {
  const { userInfo } = request;

  const url = getAllSuccessProblemTabUrl(chrome.runtime.id, userInfo);
  createChromeTab(url);
};

const getAllSuccessProblemTabUrl = (runtimeId: string, { userName, userImg }: UserInfoType) =>
  `chrome-extension://${runtimeId}/profileTab.html?name=${userName}&img=${userImg}`;

export { createSuccessProblemTab };
