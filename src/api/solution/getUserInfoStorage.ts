const getUserEmailStorage = async () => chrome.storage.local.get('userEmail');

type functionType = (userEmail: string) => Promise<number[]>;
const getSuccessProblemsIdListStorage: functionType = async (userEmail: string) =>
  (await chrome.storage.local.get([userEmail]))[userEmail];

export { getUserEmailStorage, getSuccessProblemsIdListStorage };
