import * as React from 'react';

export function setColorProperties(colors: Record<string, string>) {
  const rootStyle = document.styleSheets[0];
  if (rootStyle.cssRules.length > 0) for (let i = rootStyle.cssRules.length -1; i >= 0; i--) rootStyle.deleteRule(i);
  console.log('>>>>>>>>>> CSS Rules:', rootStyle.cssRules);
  Object.keys(colors).forEach((e) => rootStyle.insertRule(`:root{ ${e}: ${colors[e]} }`));
}

export function setRootCss(rootCss: string) {
  const rootStyle = document.styleSheets[0];
  console.log('>>>>>>>>>> CSS Rules:', rootStyle.cssRules);
  if (rootStyle.cssRules.length > 0) for (let i = rootStyle.cssRules.length -1; i >= 0; i--) rootStyle.deleteRule(i);
  rootStyle.insertRule(rootCss);
}

const ColorTheme: React.FC<{ rootCssColors: string}> = ({ rootCssColors }) => {
  /**
   * Update root variables
   * See https://stackoverflow.com/questions/45226712/how-to-change-css-root-variable-in-react
   */
   React.useEffect(() => {
    //setColorProperties(rootColors);
    setRootCss(rootCssColors);
  }, [rootColors, rootCssColors]);

  return null;
};

export default ColorTheme;
