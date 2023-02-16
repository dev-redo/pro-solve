import { ThemeProvider } from 'styled-components';
import { theme } from '../src/styles/theme';

const themeDecorator = storyFn => <ThemeProvider theme={theme}>{storyFn()}</ThemeProvider>;
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
