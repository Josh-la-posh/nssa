import { Popover as HPopover, Transition } from '@headlessui/react';
import clsx from 'clsx';
import { Fragment, useState } from 'react';
import { usePopper, PopperProps } from 'react-popper';

import { PopoverItem, PopoverItemProps } from './PopoverItem';

type PopoverProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  Omit<PopoverItemProps, 'name' | 'src'> &
  Pick<PopperProps<any>, 'placement'> & {
    children: React.ReactNode | React.ReactNode[];
    trigger: (state?: boolean) => React.ReactNode;
    disabled?: boolean;
    btnClassName?: string;
    containerClassName?: string;
  };

export const Popover = (props: PopoverProps) => {
  const [referenceElement, setReferenceElement] = useState<HTMLButtonElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: props.placement || 'auto',
    modifiers: [
      {
        name: 'computeStyles',
        options: { adaptive: false },
      },
    ],
  });

  const { children, trigger, className, disabled } = props;
  return (
    <HPopover as="div" className={clsx('relative', props.containerClassName)}>
      {({ open }) => (
        <>
          <HPopover.Button
            ref={setReferenceElement}
            disabled={disabled}
            className={clsx(
              'p-0.5 transition-opacity hover:opacity-80 focus:outline-none disabled:opacity-40',
              props.btnClassName
            )}
          >
            {trigger(open)}
          </HPopover.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <HPopover.Panel
              ref={setPopperElement}
              style={styles.popper}
              as="ul"
              {...attributes.popper}
              className={clsx('shadow-initial/5 z-30 shadow-sm', className)}
            >
              {children}
            </HPopover.Panel>
          </Transition>
        </>
      )}
    </HPopover>
  );
};

Popover.Item = PopoverItem;
