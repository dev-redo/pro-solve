import { db } from '@src/firebase';
import { User } from 'firebase/auth';
import { doc, setDoc, Timestamp } from 'firebase/firestore';
import { getCurrentUser } from '@src/api/login/getCurrentUser';
import { Message } from '@src/types/global';

const postCurrentSolution = async ({ request, sendResponse }: Message) => {
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

export { postCurrentSolution };
