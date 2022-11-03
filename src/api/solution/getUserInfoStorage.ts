const getUserEmailStorage = async () => chrome.storage.local.get('userEmail');

const getSuccessProblemsIdListStorage = async (userEmail: string) =>
  (await chrome.storage.local.get([userEmail]))[userEmail];

export { getUserEmailStorage, getSuccessProblemsIdListStorage };
