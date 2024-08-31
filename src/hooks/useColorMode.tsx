import { useState, useEffect } from 'react';

import storage from '@/utils/storage';

type colorTypes = 'light' | 'dark';

export const useColorMode = (defaultValue?: colorTypes) => {
  const storageDefault = storage.getValue('theme');
  // const deviceDefault = window?.matchMedia('(prefers-color-scheme: dark)').matches
  //   ? 'dark'
  //   : 'light';

  const [color, setColor] = useState(storageDefault || defaultValue);

  const colorTheme = color === 'dark' ? 'light' : 'dark';

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove(colorTheme);
    root.classList.add(color);

    storage.setValue('theme', color);
  }, [color, colorTheme]);

  return { color, setColor };
};
