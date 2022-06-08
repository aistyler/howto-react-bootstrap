import * as React from 'react';
import { rootColors, rootCssColors } from './colors/DarkTheme';
import { setColorProperties, setRootCss } from './ColorTheme';
// 👇 Only important line - as this component should be lazy-loaded,
//    to enable code - splitting for this CSS.
import '../styles/dark.theme.css';

type RootColorKeys = keyof typeof rootColors;


const DarkTheme: React.FC = () => {
  /**
   * Update root variables
   * See https://stackoverflow.com/questions/45226712/how-to-change-css-root-variable-in-react
   */
  React.useEffect(() => {
    //setColorProperties(rootColors);
    setRootCss(rootCssColors);
  }, []);
  return null;
};

export default DarkTheme;
