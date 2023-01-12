import { fetchRequest } from '@src/utils/fetchRequest';
import { ALL_PROBLEM_URL } from '@src/constants/url';

const getAllProblemsList = async () =>
  await fetchRequest({
    url: ALL_PROBLEM_URL,
  });

export { getAllProblemsList };
