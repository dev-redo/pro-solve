import { auth, db } from '../../firebase';
import { doc, setDoc } from 'firebase/firestore';

if (typeof chrome.runtime.onInstalled !== 'undefined') {
  // TODO: firebase에 데이터 fetch하는 로직 넣기
  chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
    console.log('hello from message');
    const cityRef = doc(db, 'cities', 'BJ');
    setDoc(cityRef, { capital: true }, { merge: true });

    sendResponse({ farewell: 'goodbye' });
  });
}
