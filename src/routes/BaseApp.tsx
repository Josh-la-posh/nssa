import { Suspense } from 'react';
import { useOutlet } from 'react-router-dom';

import { MainLayout } from '@/components/Layout';

export const BaseApp = () => {
  const outlet = useOutlet();

  return (
    <MainLayout>
      <Suspense fallback={<h1>Loading...</h1>}>{outlet}</Suspense>
    </MainLayout>
  );
};
