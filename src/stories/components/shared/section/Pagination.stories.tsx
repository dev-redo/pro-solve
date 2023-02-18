import type { ComponentStoryFn, ComponentMeta } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs';

import Pagination from '@src/components/shared/section/Pagination';

export default {
  title: 'Component/Shared/Section/Button',
  component: Pagination,
  argTypes: {
    total: {
      control: { type: 'number', min: 0 },
      defaultValue: 100,
    },
    limit: {
      control: { type: 'number', min: 1 },
      defaultValue: 10,
    },
    unit: {
      control: { type: 'number', min: 1 },
      defaultValue: 5,
    },
    pageIdx: {
      control: { type: 'number', min: 0 },
      defaultValue: 0,
    },
    onChangePageIdx: {
      control: null,
    },
  },
  decorators: [withKnobs],
} as ComponentMeta<typeof Pagination>;

const Template: ComponentStoryFn<typeof Pagination> = args => <Pagination {...args} />;
export const FirstPage = Template.bind({});
FirstPage.args = {
  pageIdx: 0,
  total: 100,
  limit: 10,
  unit: 5,
  onChangePageIdx: action('onChangePageIdx'),
};

export const Disabled = Template.bind({});
Disabled.args = {
  total: 0,
  limit: 10,
  unit: 5,
  pageIdx: 0,
  onChangePageIdx: action('onChangePageIdx'),
};

export const LastPage = Template.bind({});
LastPage.args = {
  total: 100,
  limit: 10,
  unit: 5,
  pageIdx: 9,
  onChangePageIdx: action('onChangePageIdx'),
};
