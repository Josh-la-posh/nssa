declare module '*.svg' {
  import React = require('react');
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

// declare module '*.svg' {
//   import * as React from 'react';

//   export const ReactComponent: React.FunctionComponent<
//     React.SVGProps<SVGSVGElement> & { title?: string }
//   >;

//   export const src: string;
// }

declare module '*.jpg' {
  const content: string;
  export default content;
}

declare module '*.png' {
  import React = require('react');
  export const ReactComponent: React.FC<React.ImgHTMLAttributes>;
  const src: string;
  export default src;
}

declare module '*.json' {
  const content: string;
  export default content;
}
