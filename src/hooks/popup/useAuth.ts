import React from 'react';
import { auth } from '@src/firebase';

import { useIsLoaded } from '../useIsLoaded';

const useAuth = () => {
  const [userEmail, setUserEmail] = React.useState('');
  const { isLoaded, setIsLoaded } = useIsLoaded();

  auth.onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
      setUserEmail(firebaseUser.email as string);
    }
    setIsLoaded(false);
  });

  return { isLoaded, userEmail };
};

export { useAuth };
