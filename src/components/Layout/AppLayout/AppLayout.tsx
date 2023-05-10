import * as React from 'react';
import { MainLayout } from '..';
import { Header } from '../Header/Header';
import { Sidebar } from '../Sidebar';

type AppLayoutProps = {
  children: React.ReactNode;
};

export const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <MainLayout>
      <div className="mainLayout__container flex">
        {/* SIDEBAR */}
        <Sidebar />
        {/* MAINCONTENT */}
        <div className="mainContent relative">
          <div className='sticky top-0 bg-white'><Header /></div>
          <div className="pt-7 px-10">{children}</div>
        </div>
      </div>
    </MainLayout>
  );
};
