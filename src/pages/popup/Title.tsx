import styled from 'styled-components';

const Title = () => {
  return (
    <TitleStyle>
      <h1>프로솔브</h1>
      <span>프로그래머스 풀이를 저장하는 크롬 익스텐션</span>
    </TitleStyle>
  );
};

const TitleStyle = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  h1 {
    font-size: 2.3rem;
    font-weight: 500;
    padding-bottom: 0.8rem;
  }
  span {
    font-size: 1rem;
    font-weight: 400;
    color: ${({ theme }) => theme.color.darkGrey};
  }
`;

export default Title;
