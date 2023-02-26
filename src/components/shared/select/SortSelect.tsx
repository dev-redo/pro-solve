import React from 'react';
import { useRecoilState } from 'recoil';
import { uid } from 'react-uid';

import Select from '.';
import CheckOption from './CheckOption';
import { sortedOption } from '@src/store/select';
import { SORT_LIST as options, SORT_TYPE as filterState } from '@src/constants/solution';

const SortSelect = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selected, setSelected] = useRecoilState(sortedOption);

  return (
    <Select
      isOpen={isOpen}
      trigger={
        <CheckOption isOpen={isOpen} value={filterState[selected]} onModalChange={setIsOpen} />
      }
    >
      {options.map((option: string, index: number) => (
        <Select.Item key={uid(index)} option={option} onChangeDropdown={setSelected}>
          {filterState[option]}
        </Select.Item>
      ))}
    </Select>
  );
};

export default SortSelect;
