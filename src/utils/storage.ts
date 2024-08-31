const storagePrefix = 'openeko_web_app__';

export type keyType =
  | 'refresh-token'
  | 'token'
  | 'redirect-path'
  | 'theme'
  | 'active-role'
  | 'msw-data';

const DEFAULT_EXPIRY_DURATION = 12 * 30 * 24 * 60 * 60 * 1000;

const storage = {
  getValue: (key: keyType) => {
    const itemStr = window.localStorage.getItem(`${storagePrefix}${key}`);

    if (!itemStr) {
      return null;
    }
    const item = JSON.parse(itemStr);

    const now = Date.now();
    const timeInSeconds = now;

    if (timeInSeconds > item.expiresIn) {
      storage.clearValue(key);
      return null;
    }

    return item.value;
  },

  setValue: (key: keyType, value: unknown, duration?: number) => {
    const now = Date.now();
    const timeInSeconds = now;

    const item = {
      value: value,
      expiresIn: timeInSeconds + (duration || DEFAULT_EXPIRY_DURATION),
    };
    window.localStorage.setItem(`${storagePrefix}${key}`, JSON.stringify(item));
  },

  clearValue: (key: keyType) => {
    window.localStorage.removeItem(`${storagePrefix}${key}`);
  },

  reset: () => {
    window.localStorage.clear();
  },

  session: {
    getValue: (key: keyType) => {
      return JSON.parse(sessionStorage.getItem(`${storagePrefix}${key}`) as string);
    },
    setValue: (key: keyType, value: unknown) => {
      sessionStorage.setItem(`${storagePrefix}${key}`, JSON.stringify(value));
    },
    clearValue: (key: keyType) => {
      sessionStorage.removeItem(`${storagePrefix}${key}`);
    },
    reset: () => {
      window.sessionStorage.clear();
    },
  },
};

export default storage;
