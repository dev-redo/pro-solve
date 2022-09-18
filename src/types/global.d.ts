import React from 'react';
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

export interface HighlightProps {
  children?: React.ReactNode;
  className?: string | undefined;
  innerHTML?: boolean | undefined;
}

declare const Highlight: React.ComponentClass<HighlightProps>;
export default Highlight;

// declare module 'Highlight' {
//   export default React.ComponentClass<HighlightProps>;
// }
