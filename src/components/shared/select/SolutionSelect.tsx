import React from 'react';
import { useRecoilState } from 'recoil';
import { uid } from 'react-uid';

import Select from '.';
import CheckOption from './CheckOption';
import { solutionOption } from '@src/store/select';
import { SOLUTION_LIST as options, SOLUTION_TYPE as filterState } from '@src/constants/solution';
import '@src/styles/font.css';
import { SolutionType } from '@src/types/select';

const SolutionSelect = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selected, setSelected] = useRecoilState(solutionOption);
  const selectedName = (filterState as SolutionType)[selected];

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

export default SolutionSelect;
