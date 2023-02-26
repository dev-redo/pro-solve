import { ThemeProvider } from 'styled-components';
import { theme } from '../src/styles/theme';
import { RecoilRoot } from 'recoil';
import GlobalStyles from '../src/styles/global';

const themeDecorator = Story => (
  <ThemeProvider theme={theme}>
    <RecoilRoot>
      <GlobalStyles />
      <Story />
    </RecoilRoot>
  </ThemeProvider>
);
export const decorators = [themeDecorator];

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
