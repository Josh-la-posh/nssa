import * as React from 'react';
import { MainLayout } from '..';

type AppLayoutProps = {
  children: React.ReactNode;
};

export const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <MainLayout>
      <div className="pt-7 px-10">{children}</div>
    </MainLayout>
  );
};
