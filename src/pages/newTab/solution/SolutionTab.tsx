import styled from 'styled-components';
import LogoWhite from '../../../../assets/images/logo-white.png';
import ArrowRight from '../../../../assets/icons/ArrowRight.svg';
import Spinner from '../../../../assets/icons/BlackSpinner.svg';
import { SolutionResponse } from '../../../types/solution';
import { CenterContainer } from '../../../styles/global';
import CodeMirror from '../../../components/code/CodeMirror';

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
        <span>제출한 모든 풀이</span>
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

interface ContentProps {
  isLoaded: boolean;
  solutions: SolutionResponse;
}

SolutionTab.Content = ({ isLoaded, solutions }: ContentProps) => {
  const { status, data } = solutions;

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
      {data!.length > 0 && (
        <ContentStyle>
          {data?.map(solution => (
            <CodeMirror code={solution.code} selectedLanguage={solution.selectedLanguage} />
          ))}
        </ContentStyle>
      )}
      {data!.length === 0 && <NoContentStyle>제출한 풀이가 없습니다.</NoContentStyle>}
    </>
  );
};

const ContainerStyle = styled.div`
  height: 100%;
`;

const HeaderStyle = styled.div`
  position: sticky;
  display: flex;
  align-items: center;
  height: 3rem;
  padding: 0.375rem 1rem;
  background-color: ${props => props.theme.color.indigo};
  color: ${props => props.theme.color.greyBlue};
  font-family: 'NotoSansKRLight', sans-serif;
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
  svg {
    height: 1.5rem;
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
  gap: 0.5rem;
  span {
    font-size: 1.1rem;
    font-family: 'NanumSquareRegular', sans-serif;
    color: ${props => props.theme.color.darkGrey};
  }
`;

const NoContentStyle = styled(CenterContainer)`
  font-size: 1.1rem;
  font-family: 'NanumSquareRegular', sans-serif;
  color: ${props => props.theme.color.darkGrey};
`;

const ContentStyle = styled.div`
  margin: 2rem 4rem;
`;
