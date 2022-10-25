import { getUserEmail } from './getUserEmail';
import { getSuccessProblemIdList } from './getSuccessProblemIdList';

const initSuccessProblems = async () => {
  const userEmail = await getUserEmail();
  if (userEmail === null) return;

  chrome.storage.local.get([userEmail], async response => {
    console.log('[Pro-Solve] userEmail local storage :>> ', response[userEmail]);
    chrome.storage.local.set({
      [userEmail]: userEmail in response ? response[userEmail] : await getSuccessProblemIdList(),
    });
  });
};

export { initSuccessProblems };
