import { PROBLEM_URL } from '@src/constants/url';
import { fetchRequest } from '@src/utils/fetchRequest';

const getSuccessProblemIdList = async () => {
  const { totalPages } = await fetchRequest({ url: PROBLEM_URL + 1 });
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
  (await fetchRequest({ url: PROBLEM_URL + pageNum })).result;
