import styled from 'styled-components';
import Highlight from 'react-highlight';
import CopyClipBoard from '../button/CopyClipBoard';
import { Solution } from '../../types/solution';

interface SolutionProps {
  solution: Solution;
}

const CodeMirror = ({ solution }: SolutionProps) => {
  const { code, selectedLanguage } = solution;
  return (
    <CodeStyle>
      <CopyClipBoard codeText={code} />
      <Highlight className={selectedLanguage}>{code}</Highlight>
    </CodeStyle>
  );
};

const CodeStyle = styled.div`
  width: 100%;
  font-family: 'HackRegular', sans-serif;
  position: relative;
  code {
    line-height: 1.4rem;
    border-radius: 0.2rem;
    padding: 1.5rem;
    background-color: ${props => props.theme.color.lightBlack};
  }
  pre {
    width: 100%;
  }
`;

export default CodeMirror;
