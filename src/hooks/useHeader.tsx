import { ReactNode, useEffect } from 'react';

import { useDashboardActions } from '@/stores/dashboard';

export const useHeader = (content: ReactNode) => {
  const { updateHeaderContent } = useDashboardActions();
  useEffect(() => {
    updateHeaderContent(content);
    return () => {
      updateHeaderContent(null);
    };
  }, [content, updateHeaderContent]);

  return null;
};
