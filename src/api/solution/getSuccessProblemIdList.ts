import { PROBLEM_URL } from '@src/constants/url';
import { getJSON } from '@src/utils/fetchRequest';

interface Problem {
  id: string;
  title: string;
  partTitle: string;
  level: number;
  finishedCount: number;
  acceptanceRate: number;
  status: 'solved' | 'unsolved';
  openedAt: string;
  contentUpdatedAt: null | string;
}

interface FetchedProblemList {
  page: number;
  perPage: number;
  totalPages: number;
  totalEntries: number;
  languages:
    | 'c'
    | 'cpp'
    | 'csharp'
    | 'go'
    | 'java'
    | 'javascript'
    | 'kotlin'
    | 'python'
    | 'python3'
    | 'ruby'
    | 'scala'
    | 'swift'
    | 'mysql'
    | 'oracle';
  result: Problem[];
}

const getSuccessProblemIdList = async () => {
  const { totalPages } = await getJSON<FetchedProblemList>({ url: PROBLEM_URL + 1 });
  const promisedFetchedDataList = [...new Array(totalPages)].map((_, idx) =>
    fetchProblemPageList(idx + 1),
  );

  const fetchedDataList = await Promise.all(promisedFetchedDataList);
  return fetchedDataList
    .reduce((prev, curr) => [...prev, ...curr], [])
    .map(({ id }: { id: string }) => id);
};

export { getSuccessProblemIdList };

const fetchProblemPageList = async (pageNum: number) =>
  (await getJSON<FetchedProblemList>({ url: PROBLEM_URL + pageNum })).result;
