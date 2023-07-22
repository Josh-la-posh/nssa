import { Suspense } from 'react';
import { useOutlet } from 'react-router-dom';

import { MainLayout, Sidebar, Header } from '@/components/Layout';

export const BaseApp = () => {
  const outlet = useOutlet();

  return (
    <MainLayout>
      <Suspense fallback={<h1>Loading...</h1>}>{outlet}</Suspense>
    </MainLayout>
  );
};

export const BaseApps = () => {
  const outlet = useOutlet();

  return (
    <MainLayout>
      <div className="mainLayout__container flex">
        {/* SIDEBAR */}
        <Sidebar />
        {/* MAINCONTENT */}
        <div className="mainContent relative">
          <div className="sticky top-0 bg-white">
            <Header />
          </div>
          <Suspense fallback={<h1>Loading...</h1>}>{outlet}</Suspense>
        </div>
      </div>
    </MainLayout>
  );
};
