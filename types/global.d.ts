// Temporary typings to unblock editor red squiggles; prefer real types when possible.
declare module 'react';
declare module 'react/jsx-runtime';

declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}

