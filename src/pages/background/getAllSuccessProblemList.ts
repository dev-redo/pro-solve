import { fetchRequest } from '../../utils/fetchRequest';
import { PROBLEM_URL as BASE_URL } from '../../constants/url';
import { Message } from '../../types/global';

const createAllSuccessProblemTab = async ({ request, sendResponse }: Message) => {
  const { userName, profileImageUrl, rank, score, solvedChallengesCount } = request.data;

  const allSuccessProblem = getAllSuccessProblemList();
};

const getAllSuccessProblemTabUrl = ({ userName }: { userName: string }) =>
  `chrome-extension://success/${userName}`;

const openAllSuccessProblemTab = (url: string) =>
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    const tabIndex = tabs[0]!.index;
    chrome.tabs.create({ url, index: tabIndex + 1 });
  });

const getAllSuccessProblemList = async () => {
  const lastPage = await getEndPageNumber();
  const promisedFetchedDataList = [...new Array(lastPage)].map((_, idx) =>
    fetchProblemPageList(idx + 1),
  );
  const fetchedDataList = await Promise.all(promisedFetchedDataList);

  return fetchedDataList;
};

const fetchProblemPageList = async (pageNum: number) =>
  (await fetchRequest({ url: BASE_URL + pageNum })).result;

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

export { getAllSuccessProblemList };
