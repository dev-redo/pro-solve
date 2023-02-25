import { ComponentMeta, Story } from '@storybook/react';

import SolutionTab from '@src/pages/newTab/solution';
import Header from '@src/pages/newTab/solution/Header';
import SelectList from '@src/pages/newTab/solution/SelectList';
import Content from '@src/pages/newTab/solution/Content';
import { ContainerStyle } from '@src/pages/newTab/solution';

import { SolutionResponse } from '@src/types/solution';
import { loginMockData, logoutMockData } from './mock-data';

export default {
  title: 'Page/SolutionTab',
  component: SolutionTab,
} as ComponentMeta<typeof SolutionTab>;

interface TemplateInterface {
  selectedLanguage: string;
  problemName: string;
  isLoaded: boolean;
  solutions: SolutionResponse;
}

const Template = ({ selectedLanguage, problemName, isLoaded, solutions }: TemplateInterface) => (
  <ContainerStyle>
    <Header selectedLanguage={selectedLanguage} problemName={problemName} />
    <SelectList isLoaded={isLoaded} />
    <Content isLoaded={isLoaded} solutions={solutions} />
  </ContainerStyle>
);

export const LoginCase: Story<TemplateInterface> = (args: TemplateInterface) => (
  <Template {...args} />
);
LoginCase.args = {
  selectedLanguage: 'javascript',
  problemName: '옹알이',
  isLoaded: false,
  solutions: loginMockData,
};

export const LoadingCase: Story<TemplateInterface> = (args: TemplateInterface) => (
  <Template {...args} />
);
LoadingCase.args = {
  selectedLanguage: 'javascript',
  problemName: '옹알이',
  isLoaded: true,
  solutions: loginMockData,
};

export const LogoutCase: Story<TemplateInterface> = (args: TemplateInterface) => (
  <Template {...args} />
);
LogoutCase.args = {
  selectedLanguage: 'javascript',
  problemName: '옹알이',
  isLoaded: false,
  solutions: logoutMockData,
};
