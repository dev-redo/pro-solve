import { getJSON } from '@src/utils/fetchRequest';
import { ALL_PROBLEM_URL as url } from '@src/constants/url';

const getAllProblemsList = async () => await getJSON({ url });

export { getAllProblemsList };
