import { Tab } from '@headlessui/react';
import clsx from 'clsx';

import { TabItem, TabItemProps } from './TabItem';
type TabProps = {
  children: ChildProps[];
};

type ChildProps = {
  props: TabItemProps;
};

export const Tabs = ({ children }: TabProps) => {
  if (!Array.isArray(children)) {
    return (
      <p className="mb-4 rounded-md bg-status-error/10 p-4 text-sm font-semibold text-status-error">
        Error: Tab Items must have a minimum count of 2. Please add more items to proceed.
      </p>
    );
  }
  return (
    <div className="w-full py-4 sm:px-0">
      <Tab.Group>
        <Tab.List className="mb-4 flex w-full gap-2">
          {children.map((child, index) => {
            return (
              <Tab
                key={index}
                className={({ selected }) =>
                  clsx(
                    'border-b-2 py-1 leading-5 text-gray-800 outline-none',
                    selected
                      ? 'border-b-2 border-gray-800 font-semibold'
                      : 'border-b-transparent font-medium'
                  )
                }
              >
                {child?.props?.label}
              </Tab>
            );
          })}
        </Tab.List>

        <Tab.Panels className="mt-2">
          {children.map((child, index) => (
            <TabItem key={index}>{child?.props?.children}</TabItem>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

Tabs.Item = TabItem;
