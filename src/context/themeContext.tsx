import { ReactNode, createContext, useEffect, useState } from 'react';
import { ThemeName, getTheme } from '../style/theme';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from '../style/global';

const DEFAULT_THEME_NAME = 'light';
const THEME_LOCALSTORAGE_KEY = 'book_store_theme';

interface IState {
  themeName: ThemeName;
  toggleTheme: () => void;
}

export const state: IState = {
  themeName: DEFAULT_THEME_NAME,
  toggleTheme: () => {},
};

export const ThemeContext = createContext<IState>(state);

export const BookStoreThemeProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [themeName, setThemeName] = useState<ThemeName>(DEFAULT_THEME_NAME);

  const toggleTheme = () => {
    const theme = themeName === 'light' ? 'dark' : 'light';
    setThemeName(theme);
    localStorage.setItem(THEME_LOCALSTORAGE_KEY, theme);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem(
      THEME_LOCALSTORAGE_KEY
    ) as ThemeName;

    setThemeName(savedTheme || DEFAULT_THEME_NAME);
  }, []);

  return (
    <ThemeContext.Provider value={{ themeName, toggleTheme }}>
      <ThemeProvider theme={getTheme(themeName)}>
        <GlobalStyle themeName={themeName} />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
