import { getJSON } from '@src/utils/fetchRequest';
import { ALL_PROBLEM_URL as url } from '@src/constants/url';
import { SolvedProblemType } from '@src/types/profile/profile-layout';

const getAllProblemsList = async () => await getJSON<SolvedProblemType>({ url });

export { getAllProblemsList };
