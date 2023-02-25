import styled from 'styled-components';
import { uid } from 'react-uid';
import Spinner from '@assets/icons/BlackSpinner.svg';
import { CenterContainer } from '@src/styles/global';
import Code from '@src/components/shared/code/Code';
import '@src/styles/font.css';
import { Solution, SolutionResponse } from '@src/types/solution';
import { LoaderStyle } from '@src/styles/global';
import { filteredSolutions } from '@src/service/solution';

interface ContentProps {
  isLoaded: boolean;
  solutions: SolutionResponse;
}

const Content = ({ isLoaded, solutions }: ContentProps) => {
  const { status, data } = solutions;
  const submittedSolutions = filteredSolutions(data!);

  if (!isLoaded) {
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
      {submittedSolutions!.length > 0 && (
        <ContentStyle>
          {submittedSolutions!.map((solution: Solution, index: number) => (
            <Code key={uid(index)} solution={solution} />
          ))}
        </ContentStyle>
      )}
      {submittedSolutions!.length === 0 && <NoContentStyle>저장된 풀이가 없습니다.</NoContentStyle>}
    </>
  );
};

export default Content;

const RequestLoginStyle = styled(CenterContainer)`
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 0.6rem;
  line-height: 1.65rem;
  font-size: 1.1rem;
  font-weight: 400;
  color: ${({ theme }) => theme.color.darkGrey};

  ${({ theme }) => theme.media.tablet`
    font-size: 0.9rem;
    line-height: 1.25rem;
  `}
`;

const NoContentStyle = styled(CenterContainer)`
  font-size: 1.1rem;
  font-weight: 400;
  color: ${({ theme }) => theme.color.darkGrey};
`;

const ContentStyle = styled.div`
  padding: 1rem 8rem;

  ${({ theme }) => theme.media.tablet`
    padding: 1rem 5rem;
  `}
`;
