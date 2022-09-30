import React from 'react';
import styled from 'styled-components';
import { uid } from 'react-uid';
import { useRecoilValue } from 'recoil';
import { selectedOption } from '../../../store/select';
import LogoWhite from '../../../../assets/images/logo-white.png';
import ArrowRight from '../../../../assets/icons/ArrowRight.svg';
import Spinner from '../../../../assets/icons/BlackSpinner.svg';
import { Solution, SolutionList, SolutionResponse } from '../../../types/solution';
import { CenterContainer } from '../../../styles/global';
import Code from '../../../components/code/Code';
import SolutionSelect from '../../../components/select/SolutionSelect';
import '../../../styles/font.css';

export default function SolutionTab({ children }: { children: JSX.Element[] }) {
  return <ContainerStyle>{children}</ContainerStyle>;
}

interface HeaderProps {
  selectedLanguage: string;
  problemName: string;
}

SolutionTab.Header = ({ selectedLanguage, problemName }: HeaderProps) => {
  return (
    <HeaderStyle>
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
    </HeaderStyle>
  );
};

SolutionTab.Select = ({ isLoaded }: { isLoaded: boolean }) => {
  if (isLoaded) {
    return <></>;
  }

  return <SolutionSelect />;
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
  const selected = useRecoilValue(selectedOption);

  if (selected === '성공한 풀이') {
    return solutions.filter(({ isSuccess }) => isSuccess);
  }
  if (selected === '실패한 풀이') {
    return solutions.filter(({ isSuccess }) => !isSuccess);
  }
  return solutions;
};

const ContainerStyle = styled.div`
  height: 100%;
`;

const HeaderStyle = styled.div`
  display: flex;
  align-items: center;
  position: sticky;
  z-index: 100;
  top: 0;
  height: 3rem;
  padding: 0.375rem 1rem;
  background-color: ${({ theme }) => theme.color.jetBlack};
  color: ${({ theme }) => theme.color.greyBlue};
  font-family: 'Nanum Gothic', sans-serif;
  font-weight: 400;
  & > img {
    width: 1.5rem;
    height: 1.5rem;
  }
  & > div {
    display: flex;
    align-items: center;
    margin-left: 0.85rem;
    padding: 0.375rem 0;
    gap: 0.3rem;
  }
`;

const LoaderStyle = styled.div`
  height: 100%;
  & > svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
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
