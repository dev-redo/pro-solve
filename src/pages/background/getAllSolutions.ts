import { User } from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase';
import { getCurrentUser } from '../../utils/getCurrentUser';
import { Message } from '../../types/global';

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
