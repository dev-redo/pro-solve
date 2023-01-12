import { SolvedProblemType } from '@src/types/profile/profile-layout';

const getPartTitleListOfSolvedProblems = (solvedProblems: SolvedProblemType) => {
  const problemsTitleMap = solvedProblems.reduce<Record<string, number>>(
    (partTitleList, { partTitle }) => {
      partTitleList[partTitle] = (partTitleList[partTitle] ?? 0) + 1;
      return partTitleList;
    },
    {},
  );

  const partTitleList = Object.entries(problemsTitleMap)
    .sort(([prevTitle, prevCnt], [currTitle, currCnt]) => currCnt - prevCnt)
    .map(([title, cnt]) => `${title} (${cnt})`);

  const allProblemTitle = `전체 문제 (${solvedProblems.length})`;
  return [allProblemTitle, ...partTitleList];
};

export { getPartTitleListOfSolvedProblems };
