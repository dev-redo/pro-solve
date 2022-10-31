import { User } from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@src/firebase';
import { getCurrentUser } from '@src/api/login/getCurrentUser';
import { Message } from '@src/types/global';

const getAllSolutions = async ({ request, sendResponse }: Message) => {
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

export { getAllSolutions };
