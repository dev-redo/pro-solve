import { ComponentMeta, ComponentStoryFn } from '@storybook/react';

import Content from '@src/pages/newTab/solution/Content';
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

export const LoadingCase = Template.bind({});
LoadingCase.args = {
  isLoaded: false,
  solutions: loginMockData,
};

export const LogoutCase = Template.bind({});
LogoutCase.args = {
  isLoaded: true,
  solutions: logoutMockData,
};
