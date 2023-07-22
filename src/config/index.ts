export * from './env';
export * from './route';

const getIsApple = () => {
  const expression = /(Mac|iPhone|iPod|iPad)/i;
  const platform = navigator?.userAgent || navigator?.platform || 'unknown';

  return expression.test(platform);
};

export default {
  ACCESS_TOKEN_DURATION: 1659901125,
  BODY_HEIGHT_CLASS: 'h-[calc(100vh-72px)]',
  TOKEN_EXPIRED_STATUS: 'Access token not valid',
  IS_APPLE: getIsApple(),
};
