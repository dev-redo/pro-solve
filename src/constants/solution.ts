import { SolutionType, SortType } from '@src/types/select';

const SOLUTION_LIST = ['ALL', 'SUCCESS', 'FAILED'];
const SOLUTION_TYPE = {
  ALL: '전체 풀이',
  SUCCESS: '성공한 풀이',
  FAILED: '실패한 풀이',
} as SolutionType;

const SORT_LIST = ['DESC', 'ASC'];
const SORT_TYPE = {
  ASC: '오래된 풀이 순',
  DESC: '최신 풀이 순',
} as SortType;

export { SOLUTION_LIST, SOLUTION_TYPE, SORT_LIST, SORT_TYPE };
