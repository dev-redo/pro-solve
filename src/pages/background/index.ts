import { auth, db } from '../../firebase';
import { doc, collection, getDocs, setDoc, query, where, Timestamp } from 'firebase/firestore';
import { User } from 'firebase/auth';

type GetCurrentUserFn = () => Promise<User | null>;
const getCurrentUser: GetCurrentUserFn = () => {
  return new Promise((resolve, reject) =>
    auth.onAuthStateChanged(
      user => resolve(user),
      error => reject(error),
    ),
  );
};

type Message = {
  request: any;
  sender: chrome.runtime.MessageSender;
  sendResponse: Function;
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const message = { request, sender, sendResponse };

  if (request.method === 'postCurrentSolution') {
    postCurrentSolution(message).catch(error => {
      console.log('[Pro Solve] 로그인을 하지 않아 업로드가 되지 않습니다!', error);
      sendResponse({ status: false });
    });

    return true;
  }

  if (request.method === 'getAllSolutions') {
    getAllSolutions(message).catch(error => {
      console.log('[Pro Solve] 풀이를 가져오던 중 에러가 발생했습니다!', error);
      sendResponse({ status: false, message: error.message });
    });

    return true;
  }

  if (request.method === 'newTab') {
    newTab(message);
  }
});

const postCurrentSolution = async ({ request, sendResponse }: Message) => {
  console.log('[Pro Solve] request :>>', request);

  const { isSuccess, code, selectedLanguage, problemId, passedTestCase, failedTestCase } =
    request.data;
  const uploadTime = Timestamp.now();
  const { uid } = (await getCurrentUser()) as User;

  const codingTestRef = doc(db, 'codingTest', uid, problemId, String(uploadTime));
  await setDoc(codingTestRef, {
    isSuccess,
    code,
    passedTestCase,
    failedTestCase,
    selectedLanguage,
    uploadTime,
  });

  console.log('[Pro Solve] 업로드 성공!');
  sendResponse({ status: true });
};

const getAllSolutions = async ({ request, sendResponse }: Message) => {
  console.log('[Pro Solve] request :>>', request);

  const { selectedLanguage, problemId } = request.data;
  const { uid } = (await getCurrentUser()) as User;

  const codingTestRef = collection(db, 'codingTest', uid, problemId);
  const codingTestQuery = query(codingTestRef, where('selectedLanguage', '==', selectedLanguage));

  const querySnapshot = await getDocs(codingTestQuery);
  const data = querySnapshot.docs.map(doc => ({
    ...doc.data(),
  }));

  sendResponse({ status: true, data });
};

type Problem = {
  problemId: string;
  problemName: string;
  selectedLanguage: string;
};

const newTab = ({ request }: Message) => {
  console.log('[Pro Solve] request :>>', request);

  const problem = request.href;
  const url = getNewTabUrl(chrome.runtime.id, problem);

  openNewTab(url);
};

const getNewTabUrl = (runtimeId: string, { problemId, problemName, selectedLanguage }: Problem) =>
  `chrome-extension://${runtimeId}/solutionTab.html?num=${problemId}&name=${problemName}&language=${selectedLanguage}`;

const openNewTab = (url: string) =>
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    const tabIndex = tabs[0]!.index;
    chrome.tabs.create({ url, index: tabIndex + 1 });
  });
