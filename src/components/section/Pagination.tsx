import styled, { css } from 'styled-components';
import { uid } from 'react-uid';

interface PaginationProps {
  total: number;
  limit: number;
  pageNum: number;
  setPageNum: (page: number) => void;
}

const Pagination = ({ total, limit, pageNum, setPageNum }: PaginationProps) => {
  const numPages = Math.ceil(total / limit);

  return (
    <>
      <NavStyle>
        <ButtonStyle
          onClick={() => setPageNum(pageNum - 1)}
          disabled={pageNum === 1}
          aria-label="이전 페이지"
        >
          &lt;
        </ButtonStyle>
        <PageListStyle>
          {[...new Array(numPages)].map((_, idx) => (
            <ButtonStyle
              key={uid(idx + 1)}
              onClick={() => setPageNum(idx + 1)}
              aria-current={pageNum === idx + 1 ? 'page' : null}
              primary
            >
              {idx + 1}
            </ButtonStyle>
          ))}
        </PageListStyle>
        <ButtonStyle
          onClick={() => setPageNum(pageNum + 1)}
          disabled={pageNum === numPages}
          aria-label="다음 페이지"
        >
          &gt;
        </ButtonStyle>
      </NavStyle>
    </>
  );
};

export default Pagination;

const NavStyle = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PageListStyle = styled.span`
  margin: 0px 0.5625rem;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  background-color: rgba(215, 226, 235, 0.5);
  border-radius: 0.375rem;
`;

const ButtonStyle = styled.button.attrs(props => ({
  type: 'aria-current',
}))`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 1.75rem;
  padding: 0.3125rem 0.375rem;
  min-width: 1.75rem;
  text-align: center;
  font-size: 0.8125rem;
  color: rgb(120, 144, 160);
  white-space: nowrap;
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  border-radius: 20%;
  &[aria-label] {
    border-radius: 50%;
  }
  &[disabled] {
    background-color: #f0f4f7;
    cursor: revert;
    transform: revert;
  }
  &[aria-current] {
    position: relative;
    z-index: 2;
    color: ${({ theme }) => theme.color.white};
    box-shadow: rgba(0, 0, 0, 0.4) 0px 0.25rem 0.625rem;
    border-radius: 0.375rem;
    background-color: ${({ theme }) => theme.color.black};
  }
`;
