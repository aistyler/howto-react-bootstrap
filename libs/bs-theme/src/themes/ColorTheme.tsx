import * as React from 'react';


export function setRootCss(rootCss: string) {
  const rootStyle = document.styleSheets[0];
  if (rootStyle.cssRules.length > 0) for (let i = rootStyle.cssRules.length -1; i >= 0; i--) rootStyle.deleteRule(i);
  rootStyle.insertRule(rootCss);
}

const ColorTheme: React.FC<{ rootCssColors: string}> = ({ rootCssColors }) => {
   React.useEffect(() => {
    setRootCss(rootCssColors);
  }, [rootCssColors]);

  return null;
};

export default ColorTheme;
