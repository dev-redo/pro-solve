import styled from 'styled-components';
import { Solution } from '@src/types/solution';
import { formatDateToYmdhms } from '@src/utils/date/formatDateToYmdhms';
import '@src/styles/font.css';
import { formatTimestampToDate } from '@src/utils/date/formatTimestampToDate';

interface SolutionProps {
  solution: Solution;
}

const SubmissionDetail = ({ solution }: SolutionProps) => {
  const { isSuccess, passedTestCase, failedTestCase, selectedLanguage, uploadTime } = solution;
  const fireBaseTime = formatTimestampToDate(uploadTime);
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
  border: 1px solid ${({ theme }) => theme.color.grayishWhite};
  border-radius: 0.2rem;
  font-family: 'Nanum Gothic', sans-serif;
  font-weight: 300;
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

  ${({ theme }) => theme.media.tablet`
    tr {
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      gap: 0.5rem;
    }
    
    td {
      display: flex;
      justify-content: space-between;
    }
  `}
`;

const BoldSpanStyle = styled.span`
  font-family: 'Nanum Gothic', sans-serif;
  font-weight: bold;
  color: ${({ theme }) => theme.color.darkGrey};
`;

const ResultSpanStyle = styled(BoldSpanStyle)<{ result: string }>`
  font-size: '1.1rem';
  color: ${({ result, theme }) => (result === 'true' ? theme.color.green : theme.color.coral)};
`;

export default SubmissionDetail;
