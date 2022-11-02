import { getSuccessProblemIdList } from './getSuccessProblemIdList';

const setSuccessProblems = async () => {
  const { userEmail } = await chrome.storage.local.get('userEmail');
  if (userEmail === null) return;

  chrome.storage.local.get([userEmail], async response => {
    console.log('[Pro-Solve] 유저 이메일 local storage :>> ', userEmail);
    console.log('[Pro-Solve] 유저가 성공한 문제 Id list local storage :>> ', response[userEmail]);

    chrome.storage.local.set({
      [userEmail]: userEmail in response ? response[userEmail] : await getSuccessProblemIdList(),
    });
  });
};

export { setSuccessProblems };
