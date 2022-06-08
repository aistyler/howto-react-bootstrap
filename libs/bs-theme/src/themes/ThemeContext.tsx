import React, {
  createContext,
  useContext,
  useState,
} from 'react'

//
// color theme and colors
//
import ColorTheme from './ColorTheme';
import { rootCssColors as defaultRootCssColors } from './colors/default-theme';
import { rootCssColors as darkRootCssColors } from './colors/dark-theme';
import { rootCssColors as lightRootCssColors } from './colors/light-theme';

import './bootstrap.theme.css';

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
  return (localStorage.getItem(THEME_STORAGE_KEY) || defaultColorTheme) as ColorThemeName;
};

const _setTheme = (theme: ColorThemeName) => {
  if (!isServer) localStorage.setItem(THEME_STORAGE_KEY, theme);
}

//
// theme context
//
const defaultContext: UseThemeProps = {
  theme: defaultColorTheme,
  setTheme: _setTheme,
};

const ThemeContext = createContext<UseThemeProps>(defaultContext)

ThemeContext.displayName = 'ThemeProvider';

//
// hook
//
export const useTheme = () => useContext(ThemeContext) ?? defaultContext

const MEDIA_color = '(prefers-color-scheme: dark)';

//
// ThemeProvider
//
export const ThemeProvider = ({ children }: { children?: React.ReactNode; }) => {
  const [theme, setThemeState] = useState<ColorThemeName>(_getTheme);

  const setTheme =(_theme: ColorThemeName) => {
    setThemeState(_theme);
    _setTheme(_theme);
  };

  return (
    <ThemeContext.Provider value={{
      theme,
      setTheme,
    }} >
      <ColorTheme 
        rootCssColors={
          theme === 'dark' ? darkRootCssColors
          : theme === 'light' ? lightRootCssColors
          : defaultRootCssColors
        }
       />
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
