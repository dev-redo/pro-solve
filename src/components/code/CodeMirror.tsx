import styled from 'styled-components';
import CopyClipBoardButton from '@src/components/button/CopyClipBoardButton';
import { Solution } from '@src/types/solution';
import { LightAsync as SyntaxHighlighter } from 'react-syntax-highlighter';
import js from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript';
import hybrid from 'react-syntax-highlighter/dist/esm/styles/hljs/hybrid';

(() => {
  SyntaxHighlighter.registerLanguage('javascript', js);
  const link = document.createElement('link');
  link.href = '//cdn.jsdelivr.net/npm/hack-font@3/build/web/hack.css';
  document.body.append(link);
})();

interface SolutionProps {
  solution: Solution;
}

const CodeMirror = ({ solution }: SolutionProps) => {
  const { code, selectedLanguage } = solution;
  return (
    <CodeStyle>
      <CopyClipBoardButton codeText={code} />
      <SyntaxHighlighter
        language={selectedLanguage}
        style={hybrid}
        lineProps={{
          style: {
            fontFamily: 'Hack, sans-serif',
            fontWeight: '400',
            fontSize: '1.05rem',
            lineHeight: '1.5rem',
          },
        }}
        customStyle={{ padding: '1rem', borderRadius: '0.2rem' }}
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
