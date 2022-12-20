import { SelectNameType } from '@src/types/profile/profile-layout';

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

const STATIST_HEAD = ['레벨', '푼 문제', '전체 문제', '백분위'];

const PROBLEM_LIST = [
  { item: 'level', name: '난이도' },
  { item: 'title', name: '제목' },
  { item: 'finished-count', name: '완료한 사람' },
  { item: 'acceptance-rate', name: '정답률' },
];

export { NAV_LIST, NAV_TYPE, SORT_LIST, SORT_TYPE, STATIST_HEAD, PROBLEM_LIST };
