import * as React from 'react';
import { rootColors } from './colors/DefaultTheme';

// 👇 Only important line - as this component should be lazy-loaded,
//    to enable code - splitting for this CSS.
import '../styles/default.theme.css';

type RootColorKeys = keyof typeof rootColors;

const DefaultTheme: React.FC = () => {
  /**
   * Update root variables
   * See https://stackoverflow.com/questions/45226712/how-to-change-css-root-variable-in-react
   */
  React.useEffect(() => Object.keys(rootColors).forEach((e) => document.documentElement.style.setProperty(e, rootColors[e as RootColorKeys]), []));
  return <></>;
};

export default DefaultTheme;

