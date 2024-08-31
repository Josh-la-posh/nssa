import { Combobox, Transition } from '@headlessui/react';
import clsx from 'clsx';
import { Fragment, memo, useEffect, useMemo, useState } from 'react';

import { ReactComponent as ArrowIcon } from '@/assets/icons/arrow.svg';
import { ReactComponent as CheckIcon } from '@/assets/icons/check.svg';
import { Spinner, Tooltip } from '@/components/Elements';
import { IconProps, SelectOptionType, SingleSelectFieldProps } from '@/types/components/form';

import { FieldWrapperPassThroughProps } from '../../FieldWrapper';

type SelectFieldProps = FieldWrapperPassThroughProps & SingleSelectFieldProps & IconProps;

const sizes = {
  sm: 'p-2 text-sm',
  md: 'p-2.5 text-base',
  lg: 'p-4 text-base',
};

const SelectComponent: React.FC<SelectFieldProps> = (props) => {
  const {
    className,
    options,
    error,
    placeholder,
    renderSelected,
    renderOption,
    size = 'md',
    registration,
    value,
    onChange,
    startIcon,
    isLoading,
    disabled,
    name,
    setApiQuery,
  } = props;

  const [selected, setSelected] = useState<SelectOptionType | null>(
    options.find((x) => x.value === value) || null
  );
  const [query, setQuery] = useState('');

  const handleOnchange = (e: SelectOptionType) => {
    setSelected(e);
    if (registration?.onChange) {
      if (setApiQuery) {
        setApiQuery(query);
      }
      registration.onChange({
        target: {
          value: e.value as string,
          name: registration.name || name,
        },
      });
    }
    if (onChange) {
      if (setApiQuery) {
        setApiQuery(query);
      }
      onChange({
        target: {
          value: e.value as string,
          name: name as string,
        },
      });
    }
  };

  const filteredOptions: SelectOptionType[] = useMemo(() => {
    if (query === '') {
      return options;
    } else {
      if (setApiQuery) {
        setApiQuery(query);
      }
      return options?.filter((option) => {
        if (option.key) {
          return option.key?.toLowerCase().includes(query.toLowerCase());
        }
        if (typeof option.label === 'string') {
          return (option.label as string)?.toLowerCase().includes(query.toLowerCase());
        }
        return options;
      });
    }
  }, [options, query, setApiQuery]);

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
    <Combobox
      disabled={disabled || isLoading}
      nullable
      value={selected}
      name={registration?.name || props.name}
      {...registration}
      onChange={handleOnchange}
      by="value"
    >
      {({ open }) => (
        <>
          <div className={(clsx('relative mt-1 max-w-full'), className)}>
            <div className="relative">
              <Combobox.Button
                role="combobox"
                className={clsx(
                  'focus-visible:border-indigo-500 relative flex w-full cursor-pointer rounded-md border border-gray-400 bg-transparent text-left font-medium transition-colors duration-200 hover:border-blue-400 focus:border-blue-500 focus:outline-none',
                  open && 'border-gray-500',
                  error ? 'border-status-error focus:border-status-error' : 'border-gray-400',
                  sizes[size],
                  disabled && 'cursor-not-allowed',
                  startIcon && '!pl-10'
                )}
              >
                {startIcon && (
                  <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    {startIcon}
                  </span>
                )}

                <div className="mr-2">
                  {selected ? (
                    renderSelected ? (
                      renderSelected(selected)
                    ) : (
                      <div className="truncate whitespace-nowrap">{selected?.label}</div>
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
              </Combobox.Button>

              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                afterLeave={() => setQuery('')}
              >
                <div className="absolute z-10 w-full bg-white dark:bg-blue-600">
                  <div
                    className={clsx(
                      'relative mt-0 w-full space-y-0.5 rounded-md border border-t-0 shadow-sm  ring-2 ring-gray-500 ring-opacity-5 focus:outline-none dark:border-gray-600 ',
                      error && 'border-status-error focus:border-status-error'
                    )}
                  >
                    <div className={clsx('sticky top-0 z-10 w-full p-2')}>
                      <Combobox.Input
                        placeholder={'Search...'}
                        className={clsx(
                          'cusor-text w-full rounded-md border bg-transparent px-3 py-2 text-left text-sm placeholder-gray-400 transition-colors duration-200 focus:outline-none disabled:cursor-not-allowed dark:border-gray-600 '
                        )}
                        onChange={(event) => setQuery(event.target.value)}
                      />
                    </div>

                    <Combobox.Options className={'max-h-60 overflow-auto '}>
                      {filteredOptions.length === 0 && query !== '' ? (
                        <div className="relative cursor-default select-none px-4 py-4 text-center text-sm font-normal text-gray-600">
                          😞 No result found.
                        </div>
                      ) : (
                        filteredOptions?.map((item) => {
                          return (
                            <Combobox.Option
                              key={item.value.toString()}
                              disabled={item.disabled}
                              className={({ active }) =>
                                clsx(
                                  'relative cursor-pointer select-none ',
                                  'text-gray-700 dark:text-white',
                                  active && 'bg-gray-100 dark:bg-gray-600/40'
                                )
                              }
                              value={item}
                            >
                              {({ selected, active }) => {
                                return (
                                  <>
                                    {renderOption ? (
                                      renderOption(item, { selected, active })
                                    ) : (
                                      <Tooltip
                                        className="!bg-blue-300 text-xs "
                                        content={item.label}
                                      >
                                        <>
                                          <span
                                            className={clsx(
                                              'pl-2 pr-10',
                                              sizes[size],
                                              'block truncate font-medium',
                                              selected
                                                ? 'bg-blue-200/10 font-semibold text-gray-800 dark:text-white'
                                                : ''
                                            )}
                                          >
                                            {item.label}
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
                                );
                              }}
                            </Combobox.Option>
                          );
                        })
                      )}
                    </Combobox.Options>
                  </div>
                </div>
              </Transition>
            </div>
          </div>
        </>
      )}
    </Combobox>
  );
};

export const SingleCombobox = memo(SelectComponent);
