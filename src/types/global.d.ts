import Chrome from 'chrome';
import { Theme } from '../styles/theme';
import { CSSProp } from 'styled-components';

declare namespace chrome {
  export default Chrome;
}

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends Theme {}
}

declare module 'react' {
  interface Attributes {
    css?: CSSProp | CSSObject;
  }
}

declare module 'recoil';
declare module 'react-uid';
declare module 'storybook';

type Message = {
  request: unknown;
  sender: chrome.runtime.MessageSender;
  sendResponse: (response?: unknown) => void;
};

type Children = {
  children: JSX.Element | JSX.Element[];
};

export { Message, Children };
