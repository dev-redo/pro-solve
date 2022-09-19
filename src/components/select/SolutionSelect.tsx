import React from 'react';
import { useRecoilState } from 'recoil';
import { selectedOption } from '../../store/select';
import styled from 'styled-components';
import CloseBoxOnOutside from '../section/CloseBoxOnOutside';
import Select from '.';
import DropdownIcon from '../../../assets/icons/Dropdown.svg';

const SolutionSelect = () => {
  const options = ['전체 풀이', '성공한 풀이', '실패한 풀이'];
  const [isOpen, setIsOpen] = React.useState(false);
  const [selected, setSelected] = useRecoilState(selectedOption);

  return (
    <Select
      trigger={<CheckButton isOpen={isOpen} value={selected} onModalChange={setIsOpen} />}
      isOpen={isOpen}
      onChangeOption={(event: React.MouseEvent) =>
        setSelected((event.target as HTMLTextAreaElement).value)
      }
      options={options}
    />
  );
};

interface CheckButtonProps {
  isOpen: boolean;
  value: string;
  onModalChange: Function;
}

const CheckButton = ({ isOpen, value, onModalChange }: CheckButtonProps) => {
  const onClose = () => onModalChange(false);
  const onOpen = () => onModalChange(true);

  return (
    <CloseBoxOnOutside onClose={onClose}>
      <CheckButtonStyle isOpen={isOpen} onClick={onOpen}>
        <span>{value}</span>
        <DropdownIcon />
      </CheckButtonStyle>
    </CloseBoxOnOutside>
  );
};

const CheckButtonStyle = styled.div<{ isOpen: boolean }>`
  display: flex;
  align-items: center;
  position: relative;
  z-index: 1;
  cursor: pointer;
  font-size: 1rem;
  font-family: 'NotoSansKRRegular', sans-serif;
  color: ${props => props.theme.color.darkGrey};
  background-color: ${props =>
    props.isOpen ? props.theme.color.grayishWhite : props.theme.color.grey};
  margin-bottom: 1rem;
  padding: 0.8rem 1.2rem;
  border-radius: 0.2rem;
  outline: ${props => props.isOpen && `${props.theme.color.grey} 2px solid`};
  &:hover {
    background-color: ${props => props.theme.color.grayishWhite};
  }
  span {
    margin-right: 0.4rem;
  }
`;

export default SolutionSelect;
