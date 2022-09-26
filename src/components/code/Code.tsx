import styled from 'styled-components';
import CodeMirror from './CodeMirror';
import SubmissionDetail from './SubmissionDetail';
import { Solution } from '../../types/solution';

const Code = ({ solution }: { solution: Solution }) => {
  return (
    <CodeStyle>
      <SubmissionDetail solution={solution} />
      <CodeMirror solution={solution} />
    </CodeStyle>
  );
};

const CodeStyle = styled.div`
  margin-bottom: 4rem;
`;

export default Code;
