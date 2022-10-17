import styled from 'styled-components';
import { uid } from 'react-uid';
import { levels, levelsColor } from '../../../constants/level';
import { ProblemCntType, DoughnutType, ChartInfo, ChartInfoList } from '../../../types/profile';
import '../../../styles/font.css';
import { BoxStyle, BoldTextStyle } from '../../../styles/global';
import { getPercentile } from '../../../utils/getPercentile';
import { Children } from '../../../types/global';
import { ContentHeaderStyle, ContentHeaderInfoStyle } from '../../../styles/global';
import Book from '../../../../assets/icons/Book.svg';

export default function Problems() {
  return (
    <BoxStyle>
      <Problems.Header />
    </BoxStyle>
  );
}

Problems.Header = () => {
  return (
    <HeaderStyle>
      <Book />
      <ContentHeaderInfoStyle>유저가 푼 문제</ContentHeaderInfoStyle>
    </HeaderStyle>
  );
};

const HeaderStyle = styled(ContentHeaderStyle)`
  display: flex;
  gap: 0.5rem;
`;
