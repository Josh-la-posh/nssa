import { Listbox, Transition } from '@headlessui/react';
import clsx from 'clsx';
import { Fragment, useEffect, useMemo, useState } from 'react';

import { ReactComponent as ArrowIcon } from '@/assets/icons/arrow.svg';
import { ReactComponent as CheckIcon } from '@/assets/icons/check.svg';
import { Spinner, Tooltip } from '@/components/Elements';
import { SingleSelectFieldProps, SelectOptionType, IconProps } from '@/types/components/form';

import { FieldWrapperPassThroughProps } from '../../FieldWrapper';

const sizes = {
  sm: 'p-2 text-sm',
  md: 'p-2.5 text-base',
  lg: 'p-4 text-base',
};

type Option = SelectOptionType;

type SelectFieldProps = FieldWrapperPassThroughProps & SingleSelectFieldProps & IconProps;

export const SingleListbox = (props: SelectFieldProps) => {
  const {
    options,
    className,
    renderSelected,
    error,
    placeholder,
    registration,
    disabled,
    isLoading,
    value,
    onChange,
    name,
    startIcon,
    size = 'md',
  } = props;

  const initialValues = useMemo(() => options?.find((x) => x.value === value), [options, value]);

  const [selected, setSelected] = useState<Option | null>(initialValues || null);
  const handleOnchange = (e: Option) => {
    setSelected(e);
    if (registration?.onChange) {
      registration.onChange({
        target: {
          value: e.value as string,
          name: registration.name || name,
        },
      });
    }

    if (onChange) {
      onChange({
        target: {
          value: e.value as string,
          name: name as string,
        },
      });
    }
  };

  useEffect(() => {
    selected !== null &&
      (options.length < 1 || !options.some((option) => option.value === selected.value)) &&
      setSelected(null);
  }, [options, selected]);

  useEffect(() => {
    if (value) {
      const checkForValueOption = options.filter((option) => option.value === value);
      if (checkForValueOption.length > 0) {
        setSelected(checkForValueOption[0]);
      }
    }
  }, [options, value]);

  return (
    <Listbox
      name={name}
      disabled={disabled || isLoading}
      value={selected}
      {...registration}
      onChange={handleOnchange}
      by="value"
    >
      {({ open }) => (
        <>
          <div className={(clsx('relative mt-1 min-w-full'), className)}>
            <div className="relative">
              {startIcon && (
                <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  {startIcon}
                </span>
              )}
              <Listbox.Button
                className={clsx(
                  'focus-visible:border-indigo-500 relative block w-full cursor-pointer rounded-md border border-gray-400 bg-transparent text-left font-medium transition-colors duration-200 hover:border-blue-400 focus:border-blue-500 focus:outline-none',
                  open && 'border-gray-500',
                  error ? 'border-status-error focus:border-status-error' : 'border-gray-400',
                  sizes[size],
                  disabled && 'cursor-not-allowed',
                  startIcon && '!pl-10'
                )}
              >
                <div className="relative mr-6 w-full">
                  {selected ? (
                    renderSelected ? (
                      renderSelected(selected)
                    ) : (
                      <span className={clsx('block truncate')}>{selected?.label}</span>
                    )
                  ) : (
                    <span className="truncate text-gray-400">{placeholder}</span>
                  )}
                </div>
                {isLoading ? (
                  <Spinner size="sm" />
                ) : (
                  <ArrowIcon
                    className={clsx(
                      'absolute inset-y-0 right-3 my-auto h-3 w-3 transition-transform duration-300',
                      open ? '-rotate-180' : 'rotate-0'
                    )}
                  />
                )}
              </Listbox.Button>

              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options
                  className={clsx(
                    'absolute z-10 mt-0 max-h-60 w-full space-y-0.5 overflow-auto rounded-md border border-t-0 bg-white shadow-sm ring-2 ring-gray-500 ring-opacity-5 focus:outline-none dark:border-gray-500 dark:bg-blue-600 ',
                    error && 'border-status-error focus:border-status-error'
                  )}
                >
                  {options?.map((item, idx) => (
                    <Listbox.Option
                      key={idx}
                      disabled={item?.disabled}
                      className={({ active }) =>
                        clsx(
                          'relative cursor-pointer select-none ',
                          'text-gray-700 dark:text-white',
                          active && 'bg-gray-100 dark:bg-gray-600/40'
                        )
                      }
                      value={item}
                    >
                      {({ selected, active }) => (
                        <>
                          {props.renderOption ? (
                            props.renderOption(item, { selected, active })
                          ) : (
                            <Tooltip className="!bg-blue-300 text-xs " content={item.label}>
                              <>
                                <span
                                  className={clsx(
                                    'py-3 pl-2 pr-10',
                                    sizes[size],
                                    'block truncate font-medium',
                                    selected
                                      ? 'bg-blue-200/10 font-semibold text-gray-800 dark:text-white'
                                      : ''
                                  )}
                                >
                                  {item?.label}
                                </span>
                                {selected && (
                                  <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-status-success">
                                    <CheckIcon />
                                  </span>
                                )}
                              </>
                            </Tooltip>
                          )}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </div>
        </>
      )}
    </Listbox>
  );
};
