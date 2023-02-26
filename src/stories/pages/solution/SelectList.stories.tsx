import { ComponentMeta, ComponentStoryFn } from '@storybook/react';
import SelectList from '@src/components/domain/solution/SelectList';

export default {
  title: 'Page/SolutionTab/SelectList',
  component: SelectList,
  argTypes: {
    isLoaded: {
      control: { type: 'boolean' },
      defaultValue: true,
      description: '사용자가 선택한 언어',
    },
  },
  parameters: {
    docs: {
      description: {
        component: `SolutionTab 컴포넌트는 사용자가 제출한 풀이들을 보여주는 페이지로, 사용자가 선택한 언어로 푼 풀이들을 보여주며 Select 컴포넌트들을 이용해 필터링을 할 수 있습니다. <br /> 
        각 풀이에는 문제 이름, 사용자 이름, 코드, 작성일 등이 포함되어 있습니다. 또한, 풀이의 성공 여부를 색으로 구분하여 표시하여 사용자가 한눈에 풀이 상태를 파악할 수 있도록 합니다.`,
      },
    },
  },
} as ComponentMeta<typeof SelectList>;

const Template: ComponentStoryFn<typeof SelectList> = args => <SelectList {...args} />;
export const LoginCase = Template.bind({});
LoginCase.args = {
  isLoaded: true,
};
LoginCase.parameters = {
  docs: {
    description: {
      story: `사용자가 로그인을 했고 데이터가 받아와졌을 때의 SelectList 컴포넌트 입니다. <br />
      풀이 성공 여부에 따라 필터링하는 SolutionSelect와 시간순 정렬을 하는 SortSelect를 렌더링합니다.
      `,
    },
  },
};

export const LoadingCase = Template.bind({});
LoadingCase.args = {
  isLoaded: false,
};
LoadingCase.parameters = {
  docs: {
    description: {
      story: `아직 데이터가 받아오지 않았을 때의 SelectList 컴포넌트입니다. <br />
      아무것도 렌더링하지 않습니다.
      `,
    },
  },
};
