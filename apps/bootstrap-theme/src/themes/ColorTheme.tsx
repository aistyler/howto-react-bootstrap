import * as React from 'react';
import { rootColors as RootColorsType } from './colors/DefaultTheme';

type RootColor = typeof RootColorsType;
type RootColorKeys = keyof typeof RootColorsType;

const ColorTheme: React.FC<{ rootColors: RootColor}> = ({ rootColors }) => {
  /**
   * Update root variables
   * See https://stackoverflow.com/questions/45226712/how-to-change-css-root-variable-in-react
   */
  React.useEffect(() => Object.keys(rootColors).forEach((e) => document.documentElement.style.setProperty(e, rootColors[e as RootColorKeys]), []));
  return <></>;
};

export default ColorTheme;
