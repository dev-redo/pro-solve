import styled from 'styled-components';
import { uid } from 'react-uid';

interface PaginationProps {
  total: number;
  limit: number;
  unit: number;
  pageIdx: number;
  setPageIdx: (page: number) => void;
}

const Pagination = ({ total, unit, limit, pageIdx, setPageIdx }: PaginationProps) => {
  const numPages = Math.ceil(total / limit);
  const pageButtonList = getPaginationArray({
    numPages,
    pageIdx,
    unit,
  });

  return (
    <>
      <NavStyle>
        <ButtonStyle
          onClick={() => setPageIdx(pageIdx - 1)}
          disabled={pageIdx === 0}
          aria-label="이전 페이지"
        >
          &lt;
        </ButtonStyle>
        <PageListStyle>
          {pageButtonList.map((pageNum, idx) => (
            <ButtonStyle
              key={uid(idx + 1)}
              onClick={() => setPageIdx(pageNum - 1)}
              aria-current={pageIdx + 1 === pageNum ? 'page' : null}
            >
              {pageNum}
            </ButtonStyle>
          ))}
        </PageListStyle>
        <ButtonStyle
          onClick={() => setPageIdx(pageIdx + 1)}
          disabled={pageIdx === numPages - 1}
          aria-label="다음 페이지"
        >
          &gt;
        </ButtonStyle>
      </NavStyle>
    </>
  );
};

export default Pagination;

type PaginationArrayProps = {
  numPages: number;
  pageIdx: number;
  unit: number;
};

const getPaginationArray = ({ numPages, pageIdx, unit }: PaginationArrayProps) => {
  const pageButtonList = [...new Array(numPages)].map((_, idx) => idx + 1);

  const weight = pageIdx % unit;
  const initPage = pageIdx - weight;

  return pageButtonList.slice(initPage, initPage + unit);
};

const NavStyle = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 5rem;
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
