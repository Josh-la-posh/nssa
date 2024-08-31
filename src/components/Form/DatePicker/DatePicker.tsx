import clsx from 'clsx';
import ReactDatePicker, { DatePickerProps } from 'react-datepicker';
// import { StrictModifierNames } from 'react-popper';

import { ReactComponent as ArrowIcon } from '@/assets/icons/arrow.svg';
import { DropDown } from '@/components/Elements';
import { ErrorBoundary } from '@/components/Layout';
import { getYear, getMonth } from '@/lib/date';

import { Input, InputProps } from '../Input';

import './DatePicker.css';

const range = (start: number, stop: number, step: number) =>
  Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);

type PickerProps = DatePickerProps & {
  inputProps?: InputProps;
};

export type DatePickerRef = ReactDatePicker;
// TODO: Replace with custom DatePicker

export const DatePicker = ({ inputProps, ...restProps }: PickerProps) => {
  const years = range(1990, getYear(new Date()) + 1, 1);
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  return (
    <ErrorBoundary>
      <ReactDatePicker
        {...restProps}
        fixedHeight
        popperPlacement="bottom-start"
        customInput={<Input {...inputProps} />}
        dayClassName={() => 'dark:text-light'}
        renderCustomHeader={({
          date,
          changeYear,
          changeMonth,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
        }) => (
          <div className="flex items-center justify-between gap-2 p-2">
            <button
              onClick={decreaseMonth}
              disabled={prevMonthButtonDisabled}
              className={clsx(
                'first-letter focus:shadow-outline flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium shadow-sm shadow-gray-200 transition-colors dark:shadow-white/10',
                prevMonthButtonDisabled
                  ? 'bg-gray-200 dark:border-gray-500 dark:bg-gray-500'
                  : 'border-gray-200 dark:border-gray-500',
                'disabled:cursor-not-allowed'
              )}
            >
              <ArrowIcon className="h-4 w-2.5 rotate-90" />
            </button>

            <div className="flex items-center justify-center gap-1">
              <DropDown
                placement="bottom-start"
                className="flex flex-col !divide-y-0 border-none"
                trigger={() => (
                  <p className="inline-flex items-end gap-0.5 rounded-md p-1 text-base font-semibold shadow-sm shadow-gray-200 transition-colors hover:border-blue-400 dark:shadow-white/10">
                    {months[getMonth(date)]}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="7"
                      height="7"
                      viewBox="0 0 7 7"
                      fill="none"
                      className="mb-1.5 inline"
                    >
                      <path
                        d="M5.71967 0.280329L0.28033 5.71967C-0.192143 6.19214 0.142482 7 0.81066 7H5.5C6.32843 7 7 6.32843 7 5.5V0.81066C7 0.142482 6.19214 -0.192145 5.71967 0.280329Z"
                        fill="#2263F5"
                      />
                    </svg>
                  </p>
                )}
              >
                {months.map((option) => (
                  <DropDown.Item key={option}>
                    {({ active }) => (
                      <button
                        type="button"
                        className={clsx('w-full p-2', active ? 'bg-blue-100 text-blue-400' : '')}
                        onClick={() => changeMonth(months.indexOf(option))}
                      >
                        {option}
                      </button>
                    )}
                  </DropDown.Item>
                ))}
              </DropDown>
              <DropDown
                className="flex flex-col !divide-y-0 border-none"
                trigger={() => (
                  <p className="inline-flex items-end gap-0.5 rounded-md p-1 text-base font-semibold shadow-sm shadow-gray-200 transition-colors hover:border-blue-400 dark:shadow-white/10">
                    {getYear(date)}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="7"
                      height="7"
                      viewBox="0 0 7 7"
                      fill="none"
                      className="mb-1.5 inline"
                    >
                      <path
                        d="M5.71967 0.280329L0.28033 5.71967C-0.192143 6.19214 0.142482 7 0.81066 7H5.5C6.32843 7 7 6.32843 7 5.5V0.81066C7 0.142482 6.19214 -0.192145 5.71967 0.280329Z"
                        fill="#2263F5"
                      />
                    </svg>
                  </p>
                )}
              >
                {years.map((option) => (
                  <DropDown.Item key={option}>
                    {({ active }) => (
                      <button
                        type="button"
                        className={clsx('w-full p-2', active ? 'bg-blue-100 text-blue-400' : '')}
                        onClick={() => changeYear(option)}
                      >
                        {option}
                      </button>
                    )}
                  </DropDown.Item>
                ))}
              </DropDown>
            </div>
            <button
              type="button"
              onClick={increaseMonth}
              disabled={nextMonthButtonDisabled}
              className={clsx(
                'first-letter focus:shadow-outline flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium shadow-sm shadow-gray-200 transition-colors dark:shadow-white/10',
                nextMonthButtonDisabled
                  ? 'bg-gray-200 dark:border-gray-500 dark:bg-gray-500'
                  : 'border-gray-200 dark:border-gray-500',
                'disabled:cursor-not-allowed'
              )}
            >
              <ArrowIcon className="h-4 w-2.5 -rotate-90" />
            </button>
          </div>
        )}
        showPopperArrow={false}
      />
    </ErrorBoundary>
  );
};

DatePicker.displayName = 'DatePicker';
