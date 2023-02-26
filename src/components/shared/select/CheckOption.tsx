import styled from 'styled-components';
import CloseBoxOnOutside from '@src/components/shared/section/CloseBoxOnOutside';
import DropdownIcon from '@assets/icons/Dropdown.svg';
import '@src/styles/font.css';

interface CheckOptionProps {
  isOpen: boolean;
  value: string;
  onModalChange: (isOpen: boolean) => void;
}

const CheckOption = ({ isOpen, value, onModalChange }: CheckOptionProps) => {
  const onClose = () => onModalChange(false);
  const onOpen = () => onModalChange(true);

  return (
    <CloseBoxOnOutside onClose={onClose}>
      <CheckOptionStyle isOpen={isOpen} onClick={onOpen}>
        <span>{value}</span>
        <DropdownIcon />
      </CheckOptionStyle>
    </CloseBoxOnOutside>
  );
};

const CheckOptionStyle = styled.span<{ isOpen: boolean }>`
  z-index: 1;
  cursor: pointer;
  font-size: 1rem;
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 400;
  color: ${({ theme }) => theme.color.darkGrey};
  background-color: ${({ isOpen, theme }) =>
    isOpen ? theme.color.grayishWhite : theme.color.grey};
  margin-bottom: 1rem;
  padding: 0.8rem 1.2rem;
  border-radius: 0.2rem;
  outline: ${({ isOpen, theme }) => isOpen && `${theme.color.grey} 2px solid`};
  &:hover {
    background-color: ${({ theme }) => theme.color.grayishWhite};
  }
  span {
    margin-right: 0.4rem;
  }
`;

export default CheckOption;
