import styled from 'styled-components';
import { Solution } from '../../types/solution';
import { formatDateToYmdhms } from '../../utils/formatDateToYmdhms';

interface SolutionProps {
  solution: Solution;
}

const SubmissionDetail = ({ solution }: SolutionProps) => {
  const { isSuccess, passedTestCase, failedTestCase, selectedLanguage, uploadTime } = solution;
  const fireBaseTime = new Date(uploadTime.seconds * 1000 + uploadTime.nanoseconds / 1000000);
  const formatDate = formatDateToYmdhms(fireBaseTime);

  return (
    <SubmissionDetailStyle>
      <table>
        <tbody>
          <tr>
            <td>
              <span>성공한 테스트 케이스: </span>
              <BoldSpanStyle>
                {passedTestCase} / {passedTestCase + failedTestCase}
              </BoldSpanStyle>
            </td>
            <td>
              <span>결과: </span>
              <ResultSpanStyle result={isSuccess.toString()}>
                {isSuccess ? '성공' : '실패'}
              </ResultSpanStyle>
            </td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <td>
              <span>제출 날짜: </span>
              <BoldSpanStyle>{formatDate}</BoldSpanStyle>
            </td>
            <td>
              <span>언어: </span>
              <BoldSpanStyle>{selectedLanguage}</BoldSpanStyle>
            </td>
          </tr>
        </tbody>
      </table>
    </SubmissionDetailStyle>
  );
};

const SubmissionDetailStyle = styled.div`
  width: 100%;
  padding: 0.8rem 1.5rem;
  border: 1px solid ${props => props.theme.color.grayishWhite};
  border-radius: 0.2rem;
  font-family: 'NotoSansKRLight', sans-serif;
  margin-bottom: 0.8rem;
  table {
    display: grid;
    gap: 0.8rem;
    width: 100%;
  }
  tbody {
    width: 100%;
    padding: 0.25rem;
  }
  tr {
    display: flex;
    justify-content: space-between;
  }
`;

const BoldSpanStyle = styled.span`
  font-family: 'NotoSansKRRegular', sans-serif;
  color: ${props => props.theme.color.darkGrey};
`;

const ResultSpanStyle = styled(BoldSpanStyle)<{ result: string }>`
  font-size: '1.1rem';
  color: ${props => (props.result === 'true' ? props.theme.color.green : props.theme.color.coral)};
`;

export default SubmissionDetail;
