import styled from 'styled-components';
import { uid } from 'react-uid';
import { useRecoilValue } from 'recoil';
import LogoWhite from '../../../../assets/images/logo-white.png';
import ArrowRight from '../../../../assets/icons/ArrowRight.svg';
import Spinner from '../../../../assets/icons/BlackSpinner.svg';
import { GNBStyle, CenterContainer } from '../../../styles/global';
import Code from '../../../components/code/Code';
import SolutionSelect from '../../../components/select/SolutionSelect';
import SortSelect from '../../../components/select/SortSelect';
import '../../../styles/font.css';
import { solutionOption, sortedOption } from '../../../store/select';
import { Solution, SolutionList, SolutionResponse } from '../../../types/solution';
import { formatTimestampToDate } from '../../../utils/formatTimestampToDate';
import { LoaderStyle } from '../../../styles/global';
import { Children } from '../../../types/global';

export default function SolutionTab({ children }: Children) {
  return <ContainerStyle>{children}</ContainerStyle>;
}

interface HeaderProps {
  selectedLanguage: string;
  problemName: string;
}

SolutionTab.Header = ({ selectedLanguage, problemName }: HeaderProps) => {
  return (
    <GNBStyle>
      <img src={LogoWhite} />
      <div>
        <span>저장된 모든 풀이</span>
        <span>
          <ArrowRight />
        </span>
        <span>
          [{selectedLanguage}] {problemName}
        </span>
      </div>
    </GNBStyle>
  );
};

SolutionTab.Select = ({ isLoaded }: { isLoaded: boolean }) => {
  if (isLoaded) {
    return <></>;
  }

  return (
    <SelectStyle>
      <SolutionSelect />
      <SortSelect />
    </SelectStyle>
  );
};

interface ContentProps {
  isLoaded: boolean;
  solutions: SolutionResponse;
}

SolutionTab.Content = ({ isLoaded, solutions }: ContentProps) => {
  const { status, data } = solutions;
  const submitedSolutions = filteredSolutions(data!);

  if (isLoaded) {
    return (
      <LoaderStyle>
        <Spinner />
      </LoaderStyle>
    );
  }

  if (status === false) {
    return (
      <RequestLoginStyle>
        <span>로그인을 하지 않아 풀이를 받아오는 데 실패했습니다.</span>
        <span>로그인을 해주세요.</span>
      </RequestLoginStyle>
    );
  }

  return (
    <>
      {submitedSolutions!.length > 0 && (
        <ContentStyle>
          {submitedSolutions!.map((solution: Solution, index: number) => (
            <Code key={uid(index)} solution={solution} />
          ))}
        </ContentStyle>
      )}
      {submitedSolutions!.length === 0 && <NoContentStyle>저장된 풀이가 없습니다.</NoContentStyle>}
    </>
  );
};

const filteredSolutions = (solutions: SolutionList) => {
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

const ContainerStyle = styled.div`
  height: 100%;
`;

const SelectStyle = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 2rem 8rem;
  gap: 1rem;

  ${({ theme }) => theme.media.tablet`
    padding: 2rem 5rem;
  `}
`;

const RequestLoginStyle = styled(CenterContainer)`
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 0.6rem;
  line-height: 1.65rem;
  font-size: 1.1rem;
  font-family: 'Nanum Gothic', sans-serif;
  font-weight: 400;
  color: ${({ theme }) => theme.color.darkGrey};

  ${({ theme }) => theme.media.tablet`
    font-size: 0.9rem;
    line-height: 1.25rem;
  `}
`;

const NoContentStyle = styled(CenterContainer)`
  font-size: 1.1rem;
  font-family: 'Nanum Gothic', sans-serif;
  font-weight: 400;
  color: ${({ theme }) => theme.color.darkGrey};
`;

const ContentStyle = styled.div`
  padding: 1rem 8rem;

  ${({ theme }) => theme.media.tablet`
    padding: 1rem 5rem;
  `}
`;
