import styled from 'styled-components';

const RefreshRequestBox = () => {
  return <BoxStyle>새로고침을 해주세요!</BoxStyle>;
};

const BoxStyle = styled.div`
  transform: translate(-50%, 0%);
  background-color: ${({ theme }) => theme.color.grey};
  padding: 0.4375rem 0.8125rem;
  color: ${({ theme }) => theme.color.black};
  font-size: 1rem;
  font-weight: 500;
  border-radius: 0.25rem;
  box-shadow: 0 0.25rem 0.5rem rgb(20 20 84 / 4%), 0 0.5rem 1.125rem rgb(20 20 84 / 8%),
    0 1rem 2rem -0.125rem rgb(20 20 84 / 8%), 0 0 0 0.0625rem rgb(20 20 84 / 12%);
`;

export default RefreshRequestBox;
