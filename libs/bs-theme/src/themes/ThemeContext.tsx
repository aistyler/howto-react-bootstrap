import React, { createContext, useContext, useState, useEffect } from 'react';

//
// color theme and colors
//
import { rootCssColors as defaultRootCssColors } from './colors/default-theme';
import { rootCssColors as darkRootCssColors } from './colors/dark-theme';
import { rootCssColors as lightRootCssColors } from './colors/light-theme';

//
// import css
//
import './bootstrap.theme.css';
import { useMediaQuery } from '../lib/useMediaQuery';

//
// configuration
//
const THEME_STORAGE_KEY = 'theme';
const colorThemes = ['system', 'light', 'dark'] as const;

export type ColorThemeName = typeof colorThemes[number];

const defaultColorTheme = 'system' as ColorThemeName;

//
// types
//
export type UseThemeProps = {
  theme: ColorThemeName;
  setTheme: (theme: ColorThemeName) => void;
};

//
// storage helpers
//
const isServer = typeof window === 'undefined';

const _getTheme = () => {
  if (isServer) return defaultColorTheme;
  return (localStorage.getItem(THEME_STORAGE_KEY) ||
    defaultColorTheme) as ColorThemeName;
};

const _setTheme = (theme: ColorThemeName) => {
  if (!isServer) localStorage.setItem(THEME_STORAGE_KEY, theme);
};

//
// theme context
//
const defaultContext: UseThemeProps = {
  theme: defaultColorTheme,
  setTheme: _setTheme,
};

const ThemeContext = createContext<UseThemeProps>(defaultContext);
ThemeContext.displayName = 'ThemeProvider';

//
// hook
//
export const useTheme = () => useContext(ThemeContext) ?? defaultContext;

const MEDIA_color = '(prefers-color-scheme: dark)';

//
// set ':root' css props
//
function _setRootCss(rootCss: string) {
  const rootStyle = document.styleSheets[0];
  if (rootStyle.cssRules.length > 0)
    for (let i = rootStyle.cssRules.length - 1; i >= 0; i--)
      rootStyle.deleteRule(i);
  rootStyle.insertRule(rootCss);
}

//
// ThemeProvider
//
export const ThemeProvider = ({ children }: { children?: React.ReactNode }) => {
  const [theme, setThemeState] = useState<ColorThemeName>(_getTheme);
  const isSystemDark = useMediaQuery(MEDIA_color);

  const setTheme = (_theme: ColorThemeName) => {
    setThemeState(_theme);
    _setTheme(_theme);
  };

  useEffect(() => {
    let _theme = theme;
    if (theme === 'system') {
      if (isSystemDark) _theme = 'dark';
      else _theme = 'light';
    }
    // set root css rules
    if (_theme === 'dark') _setRootCss(darkRootCssColors);
    else if (_theme === 'light') _setRootCss(lightRootCssColors);
    else _setRootCss(defaultRootCssColors);
  }, [theme, isSystemDark]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
