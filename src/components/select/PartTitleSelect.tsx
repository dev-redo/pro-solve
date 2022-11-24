import React from 'react';
import { useRecoilState } from 'recoil';
import Select from '.';
import CheckOption from './CheckOption';
import { problemTitleOption } from '@src/store/select';
import { PartTitleSelectProps } from '@src/types/select';
import '@src/styles/font.css';

const PartTitleSelect = ({ partTitleList, onChangePageIdx }: PartTitleSelectProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selected, setSelected] = useRecoilState(problemTitleOption);

  const onChangePartTitle = (option: string) => {
    onChangePageIdx(0);
    setSelected(option);
  };

  return (
    <Select
      isOpen={isOpen}
      trigger={<CheckOption isOpen={isOpen} value={selected} onModalChange={setIsOpen} />}
      options={partTitleList}
      onChangeDropdown={onChangePartTitle}
    />
  );
};

export default PartTitleSelect;
