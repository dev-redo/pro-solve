import { SolvedProblemType, LevelListFunc } from '@src/types/profile/profile-layout';

const getProblemsLevelList: LevelListFunc = (problems: SolvedProblemType) =>
  problems.reduce((prev, { level }) => {
    prev[level] += 1;
    return prev;
  }, new Array(6).fill(0));

export { getProblemsLevelList };
