import { USER_INFO_URL } from '@src/constants/url';
import { fetchRequest } from '@src/utils/fetchRequest';

const getUserEmail = async () => {
  const { userInfo } = await fetchRequest({ url: USER_INFO_URL });
  if (userInfo === undefined) {
    return null;
  }

  const { email } = await userInfo;
  return email;
};

export { getUserEmail };
