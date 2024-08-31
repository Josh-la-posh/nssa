import { Menu, Transition } from '@headlessui/react';
import clsx from 'clsx';
import React, { Fragment, useState } from 'react';
import { usePopper, PopperProps } from 'react-popper';

import { DropDownItem, DropDownItemProps } from './DropDownItem';

type DropdownProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  Omit<DropDownItemProps, 'name' | 'src'> &
  Pick<PopperProps<any>, 'placement'> & {
    children: React.ReactNode[];
    trigger: (state?: boolean) => React.ReactNode;
    disabled?: boolean;
  };

export const DropDown = (props: DropdownProps) => {
  const [referenceElement, setReferenceElement] = useState<HTMLButtonElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: props.placement || 'bottom-end',
    modifiers: [{ name: 'computeStyles', options: { adaptive: false } }],
  });

  const { children, trigger, className } = props;
  return (
    <Menu as="div" className="relative">
      {({ open }) => (
        <>
          <Menu.Button type="button" ref={setReferenceElement} className="inline-block w-max">
            {trigger(open)}
          </Menu.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items
              ref={setPopperElement}
              style={styles.popper}
              {...attributes.popper}
              className={clsx(
                'shadow-initial/5 absolute z-20 max-h-56 min-w-full max-w-xs transform divide-y divide-gray-100 overflow-auto rounded-md border border-gray-200 bg-white shadow-sm dark:divide-gray-800 dark:border-gray-700 dark:bg-dark ',
                className
              )}
            >
              {children}
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
};

DropDown.Item = DropDownItem;
