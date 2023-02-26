import { ComponentMeta, ComponentStoryFn } from '@storybook/react';
import Header from '@src/components/domain/solution/Header';

export default {
  title: 'Page/SolutionTab/Header',
  component: Header,
} as ComponentMeta<typeof Header>;

const Template: ComponentStoryFn<typeof Header> = args => <Header {...args} />;
export const Default = Template.bind({});
Default.args = {
  selectedLanguage: 'javascript',
  problemName: '옹알이',
};
