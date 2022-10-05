import React from 'react';
import { useRecoilState } from 'recoil';
import Select from '.';
import CheckOption from './CheckOption';
import { sortedOption } from '../../store/select';
import { SORT_LIST as options, SORT_TYPE as filterState } from '../../constants/solution';
import '../../styles/font.css';
import { SortType } from '../../types/select';

const SortSelect = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selected, setSelected] = useRecoilState(sortedOption);
  const selectedName = (filterState as SortType)[selected];

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

export default SortSelect;
