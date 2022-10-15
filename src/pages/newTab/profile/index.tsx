import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../../styles/theme';
import styled from 'styled-components';
import GlobalStyles from '../../../styles/global';
import { fetchRequest } from '../../../utils/fetchRequest';
import { PROBLEM_URL as BASE_URL } from '../../../constants/url';
import { SolvedProblemType } from '../../../types/profile';
import DonutChart from '../../../components/chart/DonutChart';

const userNameRegex = /name=(.*)&img/;
const userImgRegex = /&img=(.*)/;

const href = window.location.href;
const userName = decodeURI(href.match(userNameRegex)![1]);
const userImg = decodeURI(href.match(userImgRegex)![1]);

const ProfileTab = () => {
  const [isLoaded, setIsLoaded] = React.useState(true);
  const [solvedProblems, setSolvedProblems] = React.useState<SolvedProblemType>([]);

  React.useEffect(() => {
    (async () => {
      const solvedProblems = await getAllSuccessProblemList();
      setSolvedProblems(solvedProblems);
      setIsLoaded(false);
    })();
  }, []);

  return (
    <div>
      <div>{userName}</div>
      <img src={userImg} alt="profile" />
      <div>{JSON.stringify(solvedProblems)}</div>
      <DonutStyle>
        <DonutChart color="#0078FF" percent={0.65} size="8rem" />
      </DonutStyle>
    </div>
  );
};

const DonutStyle = styled.div`
  display: flex;
  padding: 10px;
`;

const root = document.createElement('div');
document.body.appendChild(root);
ReactDOM.createRoot(root as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <ProfileTab />
    </ThemeProvider>
  </React.StrictMode>,
);

const getAllSuccessProblemList = async () => {
  const lastPage = await getEndPageNumber();
  const promisedFetchedDataList = [...new Array(lastPage)].map((_, idx) =>
    fetchProblemPageList(idx + 1),
  );
  const fetchedDataList = await Promise.all(promisedFetchedDataList);

  return fetchedDataList.reduce((prev, curr) => [...prev, ...curr], []);
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
