import { auth } from '../firebase';
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

export { getCurrentUser };
