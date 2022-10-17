import { db } from '../../firebase';
import { User } from 'firebase/auth';
import { doc, setDoc, Timestamp } from 'firebase/firestore';
import { getCurrentUser } from '../../utils/getCurrentUser';
import { Message } from '../../types/global';

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

const addSolvedProblemId = (id: number) => {
  chrome.storage.local.get(['solvedProblem'], response => {
    const { solvedProblem } = response;
    if (solvedProblem.includes(id)) {
      console.log(`[Pro-Solve] 이전에 성공한 문제입니다. :>> ${id}`);
      return;
    }

    chrome.storage.local.set({
      solvedProblem: [...solvedProblem, id],
    });
  });
};

export { postCurrentSolution, addSolvedProblemId };
