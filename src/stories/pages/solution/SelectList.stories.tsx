import { ComponentMeta, ComponentStoryFn } from '@storybook/react';
import SelectList from '@src/pages/newTab/solution/SelectList';

export default {
  title: 'Page/SolutionTab/SelectList',
  component: SelectList,
} as ComponentMeta<typeof SelectList>;

const Template: ComponentStoryFn<typeof SelectList> = args => <SelectList {...args} />;
export const LoginCase = Template.bind({});
LoginCase.args = {
  isLoaded: true,
};
export const LogoutCase = Template.bind({});
LoginCase.args = {
  isLoaded: false,
};
