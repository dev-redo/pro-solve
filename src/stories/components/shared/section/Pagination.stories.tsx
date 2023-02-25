import type { ComponentStoryFn, ComponentMeta } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Pagination from '@src/components/shared/section/Pagination';

export default {
  title: 'Component/Shared/Section/Pagination',
  component: Pagination,
  argTypes: {
    total: {
      control: { type: 'number', min: 0 },
      defaultValue: 100,
      description: '총 데이터의 개수',
    },
    limit: {
      control: { type: 'number', min: 1 },
      defaultValue: 10,
      description: '한 페이지당 보여줄 아이템의 개수',
    },
    unit: {
      control: { type: 'number', min: 1 },
      defaultValue: 5,
      description: '페이지 버튼 그룹의 크기',
    },
    pageIdx: {
      control: { type: 'number', min: 0 },
      defaultValue: 0,
      description: '현재 선택된 페이지의 인덱스 (0부터 시작)',
    },
    onChangePageIdx: {
      control: null,
      description: '페이지 버튼을 클릭했을 때 페이지 인덱스를 변경하는 함수',
    },
  },
  parameters: {
    docs: {
      description: {
        component: `이 페이지네이션 컴포넌트는 총 데이터의 개수, 한 페이지당 보여줄 아이템의 개수, 페이지 버튼 그룹의 크기 등을 설정하여 페이지네이션 UI를 보여줍니다. <br />
        페이지 버튼 그룹의 크기가 클수록 한 번에 보여지는 페이지 버튼이 많아집니다. <br />
        페이지 버튼을 클릭하면 onChangePageIdx 콜백 함수가 호출되며, 페이지 인덱스를 변경하여 다른 페이지를 보여줄 수 있습니다.`,
      },
    },
  },
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
