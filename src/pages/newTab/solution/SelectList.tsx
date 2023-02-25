import styled from 'styled-components';
import SolutionSelect from '@src/components/shared/select/SolutionSelect';
import SortSelect from '@src/components/shared/select/SortSelect';
import '@src/styles/font.css';

const SelectList = ({ isLoaded }: { isLoaded: boolean }) => {
  if (!isLoaded) {
    return <></>;
  }

  return (
    <SelectStyle>
      <SolutionSelect />
      <SortSelect />
    </SelectStyle>
  );
};

const SelectStyle = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 2rem 8rem;
  gap: 1rem;

  ${({ theme }) => theme.media.tablet`
    padding: 2rem 5rem;
  `};
`;

export default SelectList;
