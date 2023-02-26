import { ComponentMeta, Story } from '@storybook/react';

import React from 'react';
import { uid } from 'react-uid';

import Select from '@src/components/shared/select';
import SortSelect from '@src/components/shared/select/SortSelect';
import CheckOption from '@src/components/shared/select/CheckOption';
import { SORT_LIST as options, SORT_TYPE as filterState } from '@src/constants/solution';

export default {
  title: 'Component/Shared/Select/SortSelect',
  argTypes: {
    isOpen: {
      control: { type: 'boolean' },
      default: false,
      description: '사용자가 선택한 언어',
    },
    selected: {
      control: { type: 'string' },
      default: 'ASC',
      description: '문제 이름',
    },
    setIsOpen: {
      control: null,
      description: '데이터 로딩 여부',
    },
    setSelected: {
      control: null,
      description: '데이터 로딩 여부',
    },
  },
  component: SortSelect,
};

interface TemplateInterface {
  isOpen: boolean;
  selected: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
}

const Template = ({ isOpen, selected, setIsOpen, setSelected }: TemplateInterface) => (
  <div
    style={{
      height: '20rem',
      margin: '2rem',
    }}
  >
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
  </div>
);

export const SortSelectASC: Story<TemplateInterface> = (args: TemplateInterface) => (
  <Template {...args} />
);
SortSelectASC.args = {
  isOpen: true,
  selected: 'ASC',
};

export const SortSelectDESC: Story<TemplateInterface> = (args: TemplateInterface) => (
  <Template {...args} />
);
SortSelectDESC.args = {
  isOpen: true,
  selected: 'DESC',
};

export const SortSelectClose: Story<TemplateInterface> = (args: TemplateInterface) => (
  <Template {...args} />
);

SortSelectClose.args = {
  isOpen: false,
  selected: 'ASC',
};
