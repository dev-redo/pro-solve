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

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.method === 'postCurrentSolution') {
    (async () => {
      try {
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
      } catch (error) {
        console.error('[Pro Solve] 로그인을 하지 않아 업로드가 되지 않습니다!', error);
        sendResponse({ status: false });
      }
    })();
    return true;
  }

  if (request.method === 'getAllSolutions') {
    (async () => {
      try {
        console.log('[Pro Solve] request :>>', request);

        const { selectedLanguage, problemId } = request.data;
        const { uid } = (await getCurrentUser()) as User;

        const codingTestRef = collection(db, 'codingTest', uid, problemId);
        const codingTestQuery = query(
          codingTestRef,
          where('selectedLanguage', '==', selectedLanguage),
        );

        const querySnapshot = await getDocs(codingTestQuery);
        const data = querySnapshot.docs.map(doc => ({
          ...doc.data(),
        }));
        sendResponse({ status: true, data });
      } catch (error) {
        if (error instanceof Error) {
          console.log('[Pro Solve] 풀이를 가져오던 중 에러가 발생했습니다!', error);
          sendResponse({ status: false, message: error.message });
        }
      }
    })();

    return true;
  }

  if (request.method === 'newTab') {
    console.log('[Pro Solve] request :>>', request);

    const { selectedLanguage, problemId, problemName } = request.href;
    const url = `chrome-extension://${chrome.runtime.id}/solutionTab.html?num=${problemId}&name=${problemName}&language=${selectedLanguage}`;

    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      const tabIndex = tabs[0]!.index;
      chrome.tabs.create({ url, index: tabIndex + 1 });
    });

    // chrome.windows.getAll({ populate: false, windowTypes: ['normal'] }, windows => {
    //   for (let window of windows) {
    //     if (window.incognito) {
    //       chrome.windows.create({ url, incognito: true });
    //       return;
    //     }
    //   }

    //   chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    //     const tabIndex = tabs[0]!.index;
    //     chrome.tabs.create({ url, index: tabIndex + 1 });
    //   });
    // });
  }
});
