import { useState } from 'react';
import { getLocalStorage, setLocalStorage } from '../utils';

const useThemeToggler = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>(
    getLocalStorage('theme') || 'light'
  );

  const themeToggler = () => {
    if (theme === 'light') {
      setTheme('dark');
      setLocalStorage('theme', 'dark');
    } else {
      setTheme('light');
      setLocalStorage('theme', 'light');
    }
  };

  return {
    theme,
    themeToggler,
  };
};

export default useThemeToggler;
