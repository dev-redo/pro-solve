import { SelectNameType } from '../types/profile';

const NAV_LIST = ['MAIN', 'PROBLEM'];
const NAV_TYPE = {
  MAIN: '개요',
  PROBLEM: '문제',
};

const SORT_LIST: SelectNameType[] = ['level', 'finishedCount', 'acceptanceRate'];
const SORT_TYPE = {
  level: '난이도',
  finishedCount: '완료한 사람',
  acceptanceRate: '정답률',
};

export { NAV_LIST, NAV_TYPE, SORT_LIST, SORT_TYPE };
