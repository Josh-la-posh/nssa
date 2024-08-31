import { useCallback, useEffect, useState } from 'react';

export const useScrollToPosition = (defaultValue?: any) => {
  const [scrollPosition, setScrollPosition] = useState(defaultValue || 0);

  const handleScroll = useCallback(() => {
    window.scrollTo({
      top: scrollPosition,
      behavior: 'smooth',
    });
  }, [scrollPosition]);

  useEffect(() => {
    handleScroll();
  }, [handleScroll]);

  return [setScrollPosition, handleScroll];
};

// Ref - ref.current.offsetTop,
// Document - document.documentElement.scrollHeight,
