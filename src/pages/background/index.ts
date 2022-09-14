import { auth, db } from '../../firebase';
import { doc, setDoc, Timestamp } from 'firebase/firestore';
import { Auth, User } from 'firebase/auth';

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.method === 'postCurrentSolution') {
    (async () => {
      try {
        const { isSuccess, code, selectedLanguage, problemId, passedTestCase, failedTestCase } =
          request.data;
        const uploadTime = Timestamp.now();
        const { uid } = await getCurrentUser();

        console.log('[Pro Solve] dom node data from background :>> ', request);
        console.log('[Pro Solve] uid from background :>> ', uid);

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
        console.log('[Pro Solve] 로그인을 하지 않아 업로드가 되지 않습니다!', error);
        sendResponse({ status: false });
      }
    })();
    return true;
  }
});

// TODO: type 지정
const getCurrentUser = () => {
  return new Promise((resolve, reject) =>
    auth.onAuthStateChanged(
      user => resolve(user),
      error => reject(error),
    ),
  );
};
