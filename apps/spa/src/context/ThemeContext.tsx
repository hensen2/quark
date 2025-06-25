import { createContext, type ReactNode, useContext, useLayoutEffect, useState } from 'react';

type Theme = 'dark' | 'light' | 'system';

type ThemeProviderProps = {
  children: ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeContext = {
  theme: Theme;
  setTheme: () => void;
};

const initialState: ThemeContext = {
  theme: 'system',
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeContext>(initialState);

export const ThemeProvider = ({
  children,
  defaultTheme = 'system',
  storageKey = 'theme',
  ...props
}: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme,
  );

  useLayoutEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove('light', 'dark');

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  const value = {
    theme,
    setTheme: (): void => {
      const root = window.document.documentElement;
      const isDark = root.classList.contains('dark');

      if (isDark) {
        root.classList.replace('dark', 'light');
      } else {
        root.classList.replace('light', 'dark');
      }

      const theme = isDark ? 'light' : 'dark';

      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
  };

  return (
    <ThemeProviderContext {...props} value={value}>
      {children}
    </ThemeProviderContext>
  );
};

export const useTheme = (): ThemeContext => {
  const context = useContext(ThemeProviderContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
