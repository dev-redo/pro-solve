import { fetchRequest } from '../../utils/fetchRequest';
import { PROBLEM_URL } from '../../constants/url';

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
