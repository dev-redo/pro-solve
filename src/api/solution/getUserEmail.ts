import { USER_INFO_URL as url } from '@src/constants/url';
import { getJSON } from '@src/utils/fetchRequest';

interface UserInfo {
  isLoggedIn: boolean;
  timeZone: string;
  userInfo: {
    id: number;
    name: string;
    email: string;
    profileImageUrl: string;
    confirmed: boolean;
    isCustomer: boolean;
    isAdmin: boolean;
    abTestGroup: string;
  };
}

const getUserEmail = async () => {
  const { userInfo } = await getJSON<UserInfo>({ url });
  if (userInfo === undefined) return;

  const { email } = await userInfo;
  return email;
};

export { getUserEmail };
