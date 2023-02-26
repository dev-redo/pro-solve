import { ComponentMeta, ComponentStoryFn } from '@storybook/react';

import Content from '@src/components/domain/solution/Content';
import { loginMockData, logoutMockData } from './mock-data';

export default {
  title: 'Page/SolutionTab/Content',
  component: Content,
} as ComponentMeta<typeof Content>;

const Template: ComponentStoryFn<typeof Content> = args => <Content {...args} />;
export const LoginCase = Template.bind({});
LoginCase.args = {
  isLoaded: true,
  solutions: loginMockData,
};
LoginCase.parameters = {
  docs: {
    description: {
      story: `사용자가 로그인을 했고 데이터가 받아와졌을 때의 Content 컴포넌트입니다. <br />
      사용자가 푼 풀이가 있을 시 풀이 정보를 보여주고, 없을 시 아직 풀이한 문제가 없다는 문구를 띄웁니다.
      `,
    },
  },
};

export const LoadingCase = Template.bind({});
LoadingCase.args = {
  isLoaded: false,
  solutions: loginMockData,
};
LoadingCase.parameters = {
  docs: {
    description: {
      story: '아직 데이터가 받아오지 않았을 때의 Content 컴포넌트입니다. 로딩중 스피너를 띄웁니다.',
    },
  },
};

export const LogoutCase = Template.bind({});
LogoutCase.args = {
  isLoaded: true,
  solutions: logoutMockData,
};
LogoutCase.parameters = {
  docs: {
    description: {
      story: '사용자가 로그아웃일 때의 Content 컴포넌트입니다. 로그인을 하라는 문구를 띄웁니다.',
    },
  },
};
