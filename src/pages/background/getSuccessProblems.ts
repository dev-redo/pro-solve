import { fetchRequest } from '../../utils/fetchRequest';
import { PROBLEM_URL } from '../../constants/url';
import { Message } from '../../types/global';

const getSuccessProblemIdList = async () => {
  const lastPage = await getEndPageNumber();
  const promisedFetchedDataList = [...new Array(lastPage)].map((_, idx) =>
    fetchProblemPageList(idx + 1),
  );
  const fetchedDataList = await Promise.all(promisedFetchedDataList);

  return fetchedDataList
    .reduce((prev, curr) => [...prev, ...curr], [])
    .map(({ id }: { id: string }) => id);
};

export { getSuccessProblemIdList };

const fetchProblemPageList = async (pageNum: number) =>
  (await fetchRequest({ url: PROBLEM_URL + pageNum })).result;

const getEndPageNumber = async () => {
  const end = await initEndPageNum();
  return binarySearch({ start: end / 2, end });
};

const initEndPageNum = async () => {
  let pageNum = 1;

  while (true) {
    const isProblemListEmpty = await checkProblemListEmpty(pageNum);

    if (isProblemListEmpty) {
      break;
    }
    pageNum *= 2;
  }

  return pageNum;
};

const checkProblemListEmpty = async (pageNum: number) => {
  const problemPageList = await fetchProblemPageList(pageNum);
  return problemPageList.length === 0;
};

type binarySearchType = {
  start: number;
  end: number;
};
const binarySearch = async ({ start, end }: binarySearchType) => {
  while (start <= end) {
    let mid = Math.floor((start + end) / 2);
    const isMidPageEmpty = (await fetchProblemPageList(mid)).length;

    if (isMidPageEmpty) {
      start = mid + 1;
      continue;
    }

    const isPrevMidPageEmpty = (await fetchProblemPageList(mid - 1)).length;

    if (isPrevMidPageEmpty) {
      return mid - 1;
    }
    end = mid - 1;
  }
};
