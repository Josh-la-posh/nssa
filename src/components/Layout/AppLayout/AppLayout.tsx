import * as React from 'react';
import Logo from '../../../assets/images/onboarding/logo-white.svg';
import { Header } from '../Header/Header';

type AppLayoutProps = {
  children: React.ReactNode;
};

export const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div className="appLayout">
      <div className="appLayout__container flex">
        {/* SIDEBAR */}
        <div className="sidebar flex-column a-center pt-5">
          <div className="logo">
            <img src={Logo} alt="" />
          </div>
        </div>
        {/* MAINCONTENT */}
        <div className="mainContent relative">
          <Header />
          {children}
        </div>
      </div>
    </div>
  );
};
