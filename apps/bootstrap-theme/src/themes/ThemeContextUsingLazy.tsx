import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import { useMediaQuery } from './useMediaQuery';

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
// lazy themes
//
const DefaultTheme = React.lazy(() => import('./DefaultTheme'));
const DarkTheme = React.lazy(() => import('./DarkTheme'));
const LightTheme = React.lazy(() => import('./LightTheme'));

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
      {/* Conditionally render theme */}
      <React.Suspense fallback={<></>}>
        {theme === 'dark' && <DarkTheme />}
        {theme === 'light' && <LightTheme />}
        {theme === 'system' && <DefaultTheme />}
      </React.Suspense>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
