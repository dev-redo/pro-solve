import styled, { createGlobalStyle } from 'styled-components';
import CopyClipBoardButton from '@src/components/shared/button/CopyClipBoardButton';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { Solution } from '@src/types/solution';
import js from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript';
import hybrid from 'react-syntax-highlighter/dist/esm/styles/hljs/hybrid';

interface SolutionProps {
  solution: Solution;
}

SyntaxHighlighter.registerLanguage('javascript', js);

const GlobalStyle = createGlobalStyle`
  code {
    font-family: 'Inconsolata', sans-serif;
  }
`;

const CodeMirror = ({ solution }: SolutionProps) => {
  const { code, selectedLanguage } = solution;
  return (
    <>
      <GlobalStyle />
      <CodeStyle>
        <CopyClipBoardButton codeText={code} />
        <SyntaxHighlighter
          language={selectedLanguage}
          style={hybrid}
          lineProps={{
            style: {
              fontSize: '1.05rem',
              lineHeight: '1.5rem',
              letterSpacing: '0.1rem',
            },
          }}
          customStyle={{ padding: '1rem', borderRadius: '0.2rem' }}
          wrapLines={true}
        >
          {code}
        </SyntaxHighlighter>
      </CodeStyle>
    </>
  );
};

const CodeStyle = styled.div`
  width: 100%;
  position: relative;
`;

export default CodeMirror;
