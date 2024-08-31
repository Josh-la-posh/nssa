import { Tab } from '@headlessui/react';
import clsx from 'clsx';

export type TabItemProps = {
  children: React.ReactNode;
  label?: React.ReactNode;
};

export const TabItem = ({ children }: TabItemProps) => {
  return (
    <Tab.Panel
      className={clsx(
        'w-full rounded-xl bg-white',
        'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
      )}
    >
      {children}
    </Tab.Panel>
  );
};
