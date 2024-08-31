import * as React from 'react';
import { useLocation } from 'react-router-dom';

import { MainLayout } from '..';
import { Sidebar } from '../Sidebar';
import { TopNavBar } from '../TopNavBar';

type DashboardLayoutProps = {
  children: React.ReactNode;
};

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const location = useLocation();

  const [navBarHeight, setNavbarHeight] = React.useState(0);
  const navBarRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const calculateHeight = () => {
      if (navBarRef.current) {
        setNavbarHeight(navBarRef.current.getBoundingClientRect().height);
      }
    };
    setTimeout(() => {
      calculateHeight();
    }, 1000);

    const handleResize = () => {
      calculateHeight();
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  React.useEffect(() => {
    scrollRef.current?.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [location]);

  return (
    <MainLayout>
      <div
        ref={scrollRef}
        className="relative flex h-screen overflow-hidden scroll-smooth bg-light text-gray-900 antialiased transition-colors duration-300 dark:bg-dark dark:text-white "
      >
        {/* SIDEBAR */}
        <div className="sticky top-0 hidden flex-shrink-0 lg:block ">
          <Sidebar />
        </div>

        {/* MAINCONTENT */}
        <div className="relative h-full w-full overflow-auto">
          <div ref={navBarRef}>
            <TopNavBar />
          </div>
          <div
            className="relative min-h-fit overflow-auto rounded-lg bg-inherit"
            style={{
              height: `calc(100vh - ${navBarHeight}px)`,
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
