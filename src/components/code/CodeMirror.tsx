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
  font-family: 'Consola', sans-serif;
  position: relative;
  code {
    line-height: 1.3rem;
    border-radius: 0.2rem;
    padding: 1.5rem;
  }
  pre {
    width: 100%;
  }
`;

export default CodeMirror;
