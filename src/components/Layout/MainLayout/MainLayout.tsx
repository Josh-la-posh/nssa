import * as React from 'react';

type MainLayoutProps = {
  children: React.ReactNode;
};

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <main className="relative overflow-hidden min-h-screen antialiased text-gray-900 dark:bg-dark dark:text-white transition-colors duration-300 bg-light">
      {children}
    </main>
  );
};
