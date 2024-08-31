import { Switch as HSwitch } from '@headlessui/react';
import clsx from 'clsx';
import { useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

import { FieldWrapper, FieldWrapperPassThroughProps } from '../FieldWrapper';

const sizes = {
  sm: {
    container: 'h-[20px] w-[36px]',
    dot: 'h-[16px] w-[16px]',
  },
  md: {
    container: 'h-[28px] w-[52px]',
    dot: 'h-[24px] w-[24px]',
  },
  lg: {
    container: 'h-[38px] w-[72px]',
    dot: 'h-[34px] w-[34px]',
  },
};

type SwitchFieldProps = React.InputHTMLAttributes<HTMLInputElement> &
  FieldWrapperPassThroughProps & {
    registration?: Partial<UseFormRegisterReturn>;
    labelClassName?: string;
    size?: keyof typeof sizes;
  };

export const Switch = (props: SwitchFieldProps) => {
  const {
    label = ' ',
    checked,
    // value = props.checked,
    onChange,
    size = 'sm',
    labelClassName = 'inline-flex items-center gap-2',
    className,
    helperText,
    registration,
    error,
    name,
  } = props;
  const [enabled, setEnabled] = useState(checked);

  const handleOnchange = (e: boolean) => {
    setEnabled(e);
    if (registration?.onChange) {
      registration.onChange({
        target: {
          checked: e,
          value: e,
          name: registration.name || name,
        },
      });
    }
    if (onChange) {
      onChange({
        target: {
          value: e,
          checked: e,
          name: name as string,
        } as Record<string, unknown>,
      } as any);
    }
  };

  return (
    <FieldWrapper
      id={props.id}
      label={label}
      inLabel
      error={error}
      name={name}
      className={labelClassName}
      helperText={helperText}
    >
      <HSwitch
        checked={checked}
        {...registration}
        onChange={handleOnchange}
        className={clsx(
          'relative inline-flex shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75',
          enabled ? 'bg-status-success' : 'bg-gray-300',
          sizes[size].container,
          className
        )}
      >
        <span className="sr-only">Toggle switch</span>
        <span
          aria-hidden="true"
          className={clsx(
            'shadow-lg pointer-events-none inline-block transform rounded-full bg-white ring-0 transition duration-200 ease-in-out',
            enabled ? 'translate-x-full' : 'translate-x-0',
            sizes[size].dot,
            className
          )}
        />
      </HSwitch>
    </FieldWrapper>
  );
};
