import { useRecoilValue } from 'recoil';
import { solutionOption, sortedOption } from '@src/store/select';
import { SolutionList } from '@src/types/solution';
import { formatTimestampToDate } from '@src/utils/date/formatTimestampToDate';

export const filteredSolutions = (solutions: SolutionList) => {
  solutions = solutions || [];

  const selectedSolutionType = useRecoilValue(solutionOption);
  const selectedSortType = useRecoilValue(sortedOption);

  solutions!.sort(({ uploadTime: prevUploadTime }, { uploadTime: currUploadTime }) => {
    const prevDate = formatTimestampToDate(prevUploadTime).valueOf();
    const currDate = formatTimestampToDate(currUploadTime).valueOf();

    if (selectedSortType === 'ASC') {
      return prevDate - currDate;
    }
    return currDate - prevDate;
  });

  if (selectedSolutionType === 'SUCCESS') {
    return solutions.filter(({ isSuccess }) => isSuccess);
  }
  if (selectedSolutionType === 'FAILED') {
    return solutions.filter(({ isSuccess }) => !isSuccess);
  }
  return solutions;
};
