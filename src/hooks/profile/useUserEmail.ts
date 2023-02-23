import React from 'react';

import { setUserInfoStorage } from '@src/api/solution/setUserInfoStorage';
import { getUserEmail } from '@src/api/solution/getUserEmail';

export const useUserEmail = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(true);
  const [userEmail, setUserEmail] = React.useState<string | undefined>('');

  React.useEffect(() => {
    setUserEmailCallback({ setIsLoggedIn, setUserEmail });
  }, []);

  return {
    isLoggedIn,
    userEmail,
  };
};

interface UserEmailCallback {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setUserEmail: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const setUserEmailCallback = async ({ setIsLoggedIn, setUserEmail }: UserEmailCallback) => {
  await setUserInfoStorage();

  const userEmail = await getUserEmail();
  if (!userEmail) {
    setIsLoggedIn(false);
    return;
  }

  setUserEmail(userEmail);
};
