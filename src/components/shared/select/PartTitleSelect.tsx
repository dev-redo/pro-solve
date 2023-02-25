import React from 'react';
import { useRecoilState } from 'recoil';
import { uid } from 'react-uid';

import Select from '.';
import CheckOption from './CheckOption';
import { problemTitleOption } from '@src/store/select';
import { PartTitleSelectProps } from '@src/types/select';

const PartTitleSelect = ({
  allSolvedCnt,
  partTitleList,
  onChangePageIdx,
}: PartTitleSelectProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selected, setSelected] = useRecoilState(problemTitleOption);

  if (selected === 'ALL') {
    setSelected(`전체 문제 (${allSolvedCnt})`);
  }

  const onChangePartTitle = React.useCallback((option: string) => {
    onChangePageIdx(0);
    setSelected(option);
  }, []);

  return (
    <Select
      isOpen={isOpen}
      trigger={<CheckOption isOpen={isOpen} value={selected} onModalChange={setIsOpen} />}
    >
      {partTitleList.map((option: string, index: number) => (
        <Select.Item key={uid(index)} option={option} onChangeDropdown={onChangePartTitle}>
          {option}
        </Select.Item>
      ))}
    </Select>
  );
};

export default PartTitleSelect;
