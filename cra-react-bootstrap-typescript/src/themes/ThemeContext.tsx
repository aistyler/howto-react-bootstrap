import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import { useMediaQuery } from './useMediaQuery';
//
// import light theme css
//
import '../styles/light.theme.css';

//
// color theme and colors
//
import ColorTheme from './ColorTheme';
import { rootColors as defaultRootColors } from './colors/DefaultTheme';
import { rootColors as darkRootColors } from './colors/DarkTheme';
import { rootColors as lightRootColors } from './colors/LightTheme';

//
// configuration
//
const THEME_STORAGE_KEY = 'theme';
const colorThemes = ['system', 'light', 'dark'] as const;
const defaultColorTheme = 'system' as ColorThemeName;

//
// types
//
export type ColorThemeName = typeof colorThemes[number];
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
const setThemeStorage = (theme: ColorThemeName) => {
  if (!isServer) localStorage.setItem(THEME_STORAGE_KEY, theme);
}

//
// theme context
//
const defaultContext: UseThemeProps = {
  theme: defaultColorTheme,
  setTheme: setThemeStorage,
};
const ThemeContext = createContext<UseThemeProps>(defaultContext)
ThemeContext.displayName = 'ThemeProvider';

//
// hook
//
export const useTheme = () => useContext(ThemeContext) ?? defaultContext

const MEDIA = '(prefers-color-scheme: light)';

//
// ThemeProvider
//
export const ThemeProvider = ({ children }: { children?: React.ReactNode; }) => {
  const [theme, setThemeState] = useState<ColorThemeName>(defaultColorTheme);
  const isLightTheme = useMediaQuery(MEDIA);

  const setTheme =(_theme: ColorThemeName) => {
    setThemeState(_theme);
    setThemeStorage(_theme);
  };

  // listen to System preference
  useEffect(() => {
    if (isLightTheme) {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  }, [isLightTheme]);

  return (
    <ThemeContext.Provider value={{
      theme,
      setTheme,
    }} >
      <ColorTheme rootColors={
        theme === 'dark' ? darkRootColors
        : theme === 'light' ? lightRootColors
        : defaultRootColors
      } />
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
