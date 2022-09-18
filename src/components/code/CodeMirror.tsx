import styled from 'styled-components';
import Highlight from 'react-highlight';
import CopyClipBoard from '../button/CopyClipBoard';

interface SolutionProps {
  code: string;
  selectedLanguage: string;
}

const CodeMirror = ({ code, selectedLanguage }: SolutionProps) => {
  return (
    <CodeStyle>
      <div>
        <CopyClipBoard codeText={code} />
        <Highlight className={selectedLanguage}>{code}</Highlight>
      </div>
    </CodeStyle>
  );
};

const CodeStyle = styled.div`
  width: 100%;
  font-family: 'Consola', sans-serif;
  & > div {
    position: relative;
    background-color: ${props => props.theme.color.darkGrey};
    padding: 1rem 1rem;
  }
  pre {
    width: 100%;
  }
`;

export default CodeMirror;
