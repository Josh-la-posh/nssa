import clsx from 'clsx';
import { Fragment, ReactNode, forwardRef, useImperativeHandle, useRef, useState } from 'react';

import { ReactComponent as ArrowIcon } from '@/assets/icons/arrow.svg';
import {
  format,
  isToday,
  add,
  eachDayOfInterval,
  endOfMonth,
  getDay,
  isEqual,
  isSameMonth,
  parse,
  startOfToday,
} from '@/lib/date';

type Props = {
  value?: Date;
  dayClassName?: (day: Date) => string;
  renderDay?: (day: Date) => ReactNode;
  renderDayHeader?: (day: string) => ReactNode;
  events?: { date: string }[];
  onChange: (e: {
    target: {
      name?: string;
      value: Date;
    };
  }) => void;
};

export interface CalendarDisplay extends Partial<HTMLInputElement> {
  api: {
    nextMonth: () => Date;
    prevMonth: () => Date;
    currentMonth: () => Date;
    setMonth: (month: Date) => Date;
  };
}

export const CalendarDisplay = forwardRef<CalendarDisplay, Props>((props, ref) => {
  const { onChange, renderDayHeader, value, events, dayClassName, renderDay } = props;
  const inputRef = useRef<HTMLInputElement>(null);

  const formatEvent = (eventData: any): { [key: string]: any[] } => {
    const formattedData: any = {};
    if (!eventData) {
      return formattedData;
    }
    for (const event of eventData) {
      const { date, ...eventWithoutDate } = event;
      const eventDate = new Date(date).toDateString();
      if (formattedData[eventDate]) {
        formattedData[eventDate].push(eventWithoutDate);
      } else {
        formattedData[eventDate] = [eventWithoutDate];
      }
    }

    return formattedData;
  };

  const groupedEvents = formatEvent(events);

  useImperativeHandle(ref, () => ({
    ...inputRef.current,
    api: {
      nextMonth: nextMonth,
      prevMonth: previousMonth,
      currentMonth: getCurrentMonth,
      setMonth(month) {
        setCurrentMonth(format(month, 'MMM-yyyy'));
        return month;
      },
    },
  }));

  const today = value || startOfToday();

  const [selectedDay, setSelectedDay] = useState(today);
  const [currentMonth, setCurrentMonth] = useState(format(today, 'MMM-yyyy'));
  //   const [currentYear, setCurrentYear] = useState(format(today, 'MMM-yyyy'));
  const firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date());

  const days = eachDayOfInterval({
    start: firstDayCurrentMonth,
    end: endOfMonth(firstDayCurrentMonth),
  });

  function previousMonth() {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'));
    return firstDayNextMonth;
  }

  function nextMonth() {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'));
    return firstDayNextMonth;
  }

  function getCurrentMonth() {
    return parse(currentMonth, 'MMM-yyyy', new Date());
  }

  function handleChange(day: Date) {
    setSelectedDay(day);
    if (onChange) {
      onChange({
        target: {
          value: day,
        },
      });
    }
  }

  return (
    <div className="w-full">
      {/* <input className="sr-only" value={value?.toString()} type="date" ref={inputRef} /> */}
      <div className="w-full">
        <div className="flex items-center">
          <h2 className="flex-auto font-semibold text-gray-900 dark:text-white">
            {format(firstDayCurrentMonth, 'MMMM yyyy')}
          </h2>

          <button
            type="button"
            onClick={previousMonth}
            className="flex flex-none items-center justify-center p-1.5 text-blue-400"
          >
            <span className="sr-only">Previous month</span>
            <ArrowIcon className="h-3 w-3 rotate-90" aria-hidden="true" />
          </button>

          <button
            onClick={nextMonth}
            type="button"
            className="ml-2  flex flex-none items-center justify-center p-1.5 text-blue-400"
          >
            <span className="sr-only">Next month</span>
            <ArrowIcon className="h-3 w-3 -rotate-90" aria-hidden="true" />
          </button>
        </div>

        <div className="mt-6 grid grid-cols-7 text-center leading-6 text-gray-500">
          {Days.map((d) => (
            <Fragment key={d}>
              {renderDayHeader ? renderDayHeader(d) : <p>{d.substring(0, 2)}</p>}
            </Fragment>
          ))}
        </div>

        <div className="mt-2 grid grid-cols-7 text-sm">
          {days.map((day, dayIdx) => (
            <div
              key={day.toString()}
              className={clsx(dayIdx === 0 && colStartClasses[getDay(day)], 'py-1')}
            >
              {renderDay ? (
                renderDay(day)
              ) : (
                <button
                  type="button"
                  onClick={() => handleChange(day)}
                  className={clsx(
                    'relative',
                    dayClassName && dayClassName(day),
                    isEqual(day, selectedDay) && 'text-white dark:text-gray-900',
                    !isEqual(day, selectedDay) && isToday(day) && 'text-orange-500',
                    !isEqual(day, selectedDay) &&
                      !isToday(day) &&
                      isSameMonth(day, firstDayCurrentMonth) &&
                      'text-gray-900 dark:text-white',
                    !isEqual(day, selectedDay) &&
                      !isToday(day) &&
                      !isSameMonth(day, firstDayCurrentMonth) &&
                      'text-gray-400',
                    isEqual(day, selectedDay) && isToday(day) && 'bg-orange-500',
                    isEqual(day, selectedDay) && !isToday(day) && 'bg-gray-900 dark:bg-white',
                    !isEqual(day, selectedDay) && 'hover:bg-gray-200 dark:hover:bg-gray-500',
                    (isEqual(day, selectedDay) || isToday(day)) && 'font-semibold',
                    'mx-auto flex h-8 w-8 flex-col items-center justify-center rounded-full text-sm sm:h-10 sm:w-10 sm:text-base'
                  )}
                >
                  <time dateTime={format(day, 'yyyy-MM-dd')}>{format(day, 'd')}</time>

                  {Object.hasOwn(groupedEvents, day.toDateString()) && (
                    <div className="bottom-1 mx-auto flex gap-0.5">
                      {groupedEvents?.[day.toDateString()]?.map((x) => {
                        return <div key={x.date} className="h-1 w-1 rounded-full bg-blue-500" />;
                      })}
                    </div>
                  )}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

CalendarDisplay.displayName = 'CalendarDisplay';

const colStartClasses = [
  '',
  'col-start-2',
  'col-start-3',
  'col-start-4',
  'col-start-5',
  'col-start-6',
  'col-start-7',
];

const Days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const MonthsList = [
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
