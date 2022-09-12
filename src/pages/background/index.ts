import { auth, db } from '../../firebase';
import { doc, setDoc } from 'firebase/firestore';

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.method === 'postCurrentSolution') {
    (async () => {
      try {
        const cityRef = doc(db, 'cities', 'BJ');
        const response = await setDoc(cityRef, { capital: true });
        sendResponse({ status: true });
      } catch (error) {
        console.log('[Pro Solve] 로그인을 하지 않아 업로드가 되지 않습니다!', error);
        sendResponse({ status: false });
      }
    })();
    return true;
  }
});
