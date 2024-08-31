import { Transition } from '@headlessui/react';
import * as React from 'react';

import { Head } from '@/components/Head';
import { useDashboardState } from '@/stores/dashboard';

type MainLayoutProps = {
  children: React.ReactNode;
};

export const MainLayout = ({ children }: MainLayoutProps) => {
  const { notificationMessage } = useDashboardState();
  return (
    <>
      <Head />
      <Transition
        show={!!notificationMessage}
        appear={true}
        enter="transform ease-out duration-300 transition"
        enterFrom="-translate-y-10 opacity-0"
        enterTo="translate-y-0 opacity-100"
        leave="transition ease-in duration-300"
        leaveFrom="opacity-100 -translate-y-2"
        leaveTo="opacity-0 -translate-y-10"
        as={React.Fragment}
      >
        <div className="fixed left-0 z-30 w-full bg-blue-600 bg-opacity-80 px-2 py-3 shadow-sm backdrop-blur-sm dark:bg-blue-100 dark:bg-opacity-80">
          {notificationMessage}
        </div>
      </Transition>
      <main className="relative overflow-hidden min-h-screen antialiased text-gray-900 dark:bg-dark dark:text-white transition-colors duration-300 bg-light">
        {children}
      </main>
    </>
  );
};
