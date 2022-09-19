import styled from 'styled-components';
import CopyClipBoard from '../button/CopyClipBoard';
import { Solution } from '../../types/solution';
import { LightAsync as SyntaxHighlighter } from 'react-syntax-highlighter';
import js from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript';
import hybrid from 'react-syntax-highlighter/dist/esm/styles/hljs/hybrid';
SyntaxHighlighter.registerLanguage('javascript', js);

interface SolutionProps {
  solution: Solution;
}

const CodeMirror = ({ solution }: SolutionProps) => {
  const { code, selectedLanguage } = solution;
  return (
    <CodeStyle>
      <CopyClipBoard codeText={code} />
      <SyntaxHighlighter
        language={selectedLanguage}
        style={hybrid}
        lineProps={{
          style: {
            fontFamily: 'HackRegular, sans-serif',
            fontSize: '1rem',
            lineHeight: '1.4rem',
          },
        }}
        customStyle={{ padding: '1.5rem', borderRadius: '0.2rem' }}
        wrapLines={true}
      >
        {code}
      </SyntaxHighlighter>
    </CodeStyle>
  );
};

const CodeStyle = styled.div`
  width: 100%;
  position: relative;
`;

export default CodeMirror;
