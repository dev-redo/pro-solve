import { auth } from '../firebase';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';

const getGoogleAuthCredential = () => {
  chrome.identity.getAuthToken({ interactive: true }, token => {
    if (chrome.runtime.lastError) {
      console.error(
        '[Pro-Solve] Token을 받아오던 중 문제가 발생했습니다! :>> ',
        chrome.runtime.lastError.message,
      );
    }

    const credential = GoogleAuthProvider.credential(null, token);
    signInWithCredential(auth, credential)
      .then(firebaseAuth => {
        console.log('[Pro-Solve] Firebase 사용자 인증 정보 :>>', firebaseAuth);
      })
      .catch(error => {
        if (error.code === 'auth/invalid-credential') {
          chrome.identity.removeCachedAuthToken({ token }, getGoogleAuthCredential);
        }
      });
  });
};

export { getGoogleAuthCredential };
