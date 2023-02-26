import { ComponentMeta, ComponentStoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import CheckOption from '@src/components/shared/select/CheckOption';

export default {
  title: 'Component/Shared/Select/CheckOption',
  component: CheckOption,
  argTypes: {
    isOpen: {
      control: { type: 'boolean' },
      defaultValue: false,
      description: 'Dropdown이 열려있는지 여부를 나타내는 boolean 값',
    },
    value: {
      control: { type: 'string' },
      description: 'Dropdown 내부에 표시할 텍스트',
    },
    onModalChange: {
      control: null,
      description: 'Dropdown의 열림/닫힘 상태를 변경할 때 호출되는 함수',
    },
  },
  decorators: [
    Story => (
      <div
        style={{
          margin: '1rem',
        }}
      >
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component: `CheckOption은 Select 컴포넌트의 선택지를 표시하는데 자주 사용되는 컴포넌트입니다. <br />
          만약 Dropdown이 열려있다면(isOpen이 true) 컴포넌트의 배경 색상이 짙어집니다.
          `,
      },
    },
  },
} as ComponentMeta<typeof CheckOption>;

const Template: ComponentStoryFn<typeof CheckOption> = args => <CheckOption {...args} />;
export const Open = Template.bind({});
Open.args = {
  isOpen: true,
  value: '전체 문제',
  onModalChange: action('onModalChange'),
};
Open.parameters = {
  docs: {
    description: {
      story: 'Dropdown이 열려있을 때의 CheckOption 컴포넌트입니다.',
    },
  },
};

export const Close = Template.bind({});
Close.args = {
  isOpen: false,
  value: '전체 문제',
  onModalChange: action('onModalChange'),
};
Close.parameters = {
  docs: {
    description: {
      story: 'Dropdown이 닫혀있을 때의 CheckOption 컴포넌트입니다.',
    },
  },
};
