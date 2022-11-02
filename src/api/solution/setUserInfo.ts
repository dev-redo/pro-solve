import { getUserEmail } from './getUserEmail';
import { getSuccessProblemIdList } from './getSuccessProblemIdList';

const setUserInfo = async () => {
  const userEmail = await setUserEmail();
  await setSuccessProblems(userEmail);
};

const setUserEmail = async () => {
  const newUserEmail = await getUserEmail();

  await chrome.storage.local.set({
    userEmail: newUserEmail,
  });

  return newUserEmail;
};

const setSuccessProblems = async (userEmail: string) => {
  console.log('[Pro-Solve] 현재 로그인한 프로그래머스 계정 이메일 :>> ', userEmail);

  if (userEmail === undefined) return;
  const response = await chrome.storage.local.get([userEmail]);
  const solvedProblemsIdList = response[userEmail] ?? (await getSuccessProblemIdList());

  return chrome.storage.local.set({
    [userEmail]: solvedProblemsIdList,
  });
};

export { setUserInfo };
