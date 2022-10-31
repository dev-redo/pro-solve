import React from 'react';
import { useRecoilState } from 'recoil';
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
      options={options}
      onChangeDropdown={setSelected}
      filterState={filterState}
    />
  );
};

export default SolutionSelect;
