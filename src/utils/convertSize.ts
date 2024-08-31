import numeral from 'numeral';

export const storageSize = (size: number) => {
  return numeral(size).format('0.0b');
};

export const convertBytesToMB = (bytes: number) => {
  return bytes / (1024 * 1024);
};
