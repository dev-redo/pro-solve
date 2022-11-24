import React from 'react';
import { useRecoilState } from 'recoil';
import Select from '.';
import CheckOption from './CheckOption';
import { problemTitleOption } from '@src/store/select';
import { PartTitleSelectProps } from '@src/types/select';
import '@src/styles/font.css';

const PartTitleSelect = ({ partTitleList }: PartTitleSelectProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selected, setSelected] = useRecoilState(problemTitleOption);

  return (
    <Select
      isOpen={isOpen}
      trigger={<CheckOption isOpen={isOpen} value={selected} onModalChange={setIsOpen} />}
      options={partTitleList}
      onChangeDropdown={setSelected}
    />
  );
};

export default PartTitleSelect;
