import React from 'react';
import { useRecoilState } from 'recoil';
import { selectedOption } from '../../store/select';
import styled from 'styled-components';
import CloseBoxOnOutside from '../section/CloseBoxOnOutside';
import Select from '.';

const SolutionSelect = () => {
  const options = ['전체 풀이', '성공한 풀이', '실패한 풀이'];
  const [isOpen, setIsOpen] = React.useState(false);
  const [selected, setSelected] = useRecoilState(selectedOption);

  return (
    <Select
      trigger={<CheckButton value={selected} onModalChange={setIsOpen} />}
      isOpen={isOpen}
      onChangeOption={(event: React.MouseEvent) =>
        setSelected((event.target as HTMLTextAreaElement).value)
      }
      options={options}
    />
  );
};

const CheckButton = ({ value, onModalChange }: { value: string; onModalChange: Function }) => {
  const onClose = () => onModalChange(false);
  const onOpen = () => onModalChange(true);

  return (
    <CloseBoxOnOutside onClose={onClose}>
      <CheckButtonStyle onClick={onOpen}>{value}</CheckButtonStyle>
    </CloseBoxOnOutside>
  );
};

const CheckButtonStyle = styled.div`
  position: relative;
  z-index: 1;
  cursor: pointer;
  font-size: 1rem;
  font-family: 'NotoSansKRRegular', sans-serif;
  color: ${props => props.theme.color.darkGrey};
  margin-bottom: 1rem;
`;

export default SolutionSelect;
