import React from 'react';
import { useRecoilState } from 'recoil';
import { uid } from 'react-uid';

import Select from '.';
import CheckOption from './CheckOption';
import { sortedOption } from '@src/store/select';
import { SORT_LIST as options, SORT_TYPE as filterState } from '@src/constants/solution';
import { SortType } from '@src/types/select';

const SortSelect = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selected, setSelected] = useRecoilState(sortedOption);
  const selectedName = (filterState as SortType)[selected];

  return (
    <Select
      isOpen={isOpen}
      trigger={<CheckOption isOpen={isOpen} value={selectedName} onModalChange={setIsOpen} />}
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
