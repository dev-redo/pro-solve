import { auth, db } from '../../firebase';
import { doc, setDoc } from 'firebase/firestore';

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.method === 'postCurrentSolution') {
    (async () => {
      try {
        const { isSuccess, code, selectedLanguage, problemId, passedTestCase, failedTestCase } =
          request.data;
        console.log('[Pro Solve] ', request);
        const uid = auth.currentUser.uid;

        // codingTest/{uid}/{문제id}/{language}
        const codingTestRef = doc(db, 'codingTest', uid, problemId, selectedLanguage);
        await setDoc(codingTestRef, {
          isSuccess,
          code,
          passedTestCase,
          failedTestCase,
          uploadTime: new Date(),
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
