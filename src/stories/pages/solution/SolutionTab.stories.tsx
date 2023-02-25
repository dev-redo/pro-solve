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
  argTypes: {
    selectedLanguage: {
      control: { type: 'string' },
      description: '사용자가 선택한 언어',
    },
    problemName: {
      control: { type: 'string' },
      description: '문제 이름',
    },
    isLoaded: {
      control: { type: 'boolean' },
      defaultValue: false,
      description: '데이터 로딩 여부',
    },
    solutions: {
      control: null,
      defaultValue: loginMockData,
      description: '사용자가 제출한 풀이 리스트',
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

export const SolutionTabLoginCase: Story<TemplateInterface> = (args: TemplateInterface) => (
  <Template {...args} />
);
SolutionTabLoginCase.args = {
  selectedLanguage: 'javascript',
  problemName: '옹알이',
  isLoaded: false,
  solutions: loginMockData,
};

export const SolutionTabLoadingCase: Story<TemplateInterface> = (args: TemplateInterface) => (
  <Template {...args} />
);
SolutionTabLoadingCase.args = {
  selectedLanguage: 'javascript',
  problemName: '옹알이',
  isLoaded: true,
  solutions: loginMockData,
};

export const SolutionTabLogoutCase: Story<TemplateInterface> = (args: TemplateInterface) => (
  <Template {...args} />
);
SolutionTabLogoutCase.args = {
  selectedLanguage: 'javascript',
  problemName: '옹알이',
  isLoaded: false,
  solutions: logoutMockData,
};
