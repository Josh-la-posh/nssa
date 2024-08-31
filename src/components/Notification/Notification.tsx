import { Transition } from '@headlessui/react';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

import { ReactComponent as ClockIcon } from '@/assets/icons/clock.svg';
import { ReactComponent as CloseIcon } from '@/assets/icons/close.svg';
import { ReactComponent as CheckIcon } from '@/assets/icons/rounded-check.svg';
import { ReactComponent as MinusIcon } from '@/assets/icons/rounded-minus.svg';
import { ReactComponent as QuestionIcon } from '@/assets/icons/rounded-question.svg';
import { NotificationType } from '@/stores/misc/notifications';

const colorScheme = {
  info: {
    icon: <ClockIcon className="h-5 w-5 text-blue-400" aria-hidden="true" />,
    body: 'bg-blue-100 border border-blue-300/50',
  },
  success: {
    icon: <CheckIcon className="h-5 w-5 text-success-400" aria-hidden="true" />,
    body: 'bg-success-100 border border-success-300/50',
  },
  warning: {
    icon: <QuestionIcon className="h-5 w-5 text-warning-500" aria-hidden="true" />,
    body: 'bg-warning-100 border border-warning-300/50',
  },
  error: {
    icon: <MinusIcon className="h-5 w-5 text-danger-500" aria-hidden="true" />,
    body: 'bg-danger-100 border border-danger-300/50',
  },
};

export type NotificationProps = {
  notification: NotificationType;

  options: Partial<{
    duration: number;
  }>;
  onDismiss: (id: string) => void;
};

const positionClass = {
  right: 'sm:items-end',
  center: 'sm:items-center',
  left: 'sm:items-start',
};

export const Notification = ({
  notification: { id, type = 'info', title, message, position = 'right' },
  options: { duration },
  onDismiss,
}: NotificationProps) => {
  const [show, setShow] = useState(true);
  const [ariaLabel, setAriaLabel] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, duration);

    return () => {
      clearTimeout(timer);
    };
  }, [duration, id, onDismiss]);

  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(id);
    }, (duration as number) + 600);

    return () => {
      clearTimeout(timer);
    };
  }, [duration, id, onDismiss]);

  const handleDismiss = () => {
    setShow(false);
    setTimeout(() => {
      onDismiss(id);
    }, 400);
  };

  useEffect(() => {
    switch (type) {
      case 'error':
        setAriaLabel('Error');
        break;
      case 'info':
        setAriaLabel('Info');
        break;
      case 'success':
        setAriaLabel('Success');
        break;
      case 'warning':
        setAriaLabel('Warning');
        break;
      default:
        setAriaLabel('Alert');
    }
  }, [type]);

  return (
    <Transition
      appear={true}
      // as={Fragment}
      show={show}
      enter="transform ease-out duration-300 transition"
      enterFrom="translate-x-4 opacity-0"
      enterTo="translate-x-0 opacity-100"
      leave="transition ease-in duration-300"
      leaveFrom="opacity-100 -translate-x-2"
      leaveTo="opacity-0 translate-x-6 "
      className={clsx('flex w-full flex-col items-center space-y-4', positionClass[position])}
    >
      <div
        className={clsx(
          'pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg',
          colorScheme[type].body
        )}
      >
        <div className="p-3" role="alert" aria-label={ariaLabel}>
          <div className="flex items-start">
            <div className="flex-shrink-0 pr-2">{colorScheme[type].icon}</div>
            <div className="w-0 flex-1">
              {title && <h1 className="pb-1 text-sm font-semibold text-gray-800">{title}</h1>}

              {typeof message === 'string' && message.split('\n').length > 2 ? (
                <ul className="list-inside list-disc text-[13px] font-medium text-gray-600">
                  {message.split('\n').map((x) => {
                    return <li key={x}>{x}</li>;
                  })}
                </ul>
              ) : (
                <p className="text-[13px] font-medium text-gray-600 first-letter:capitalize">
                  {message}
                </p>
              )}
            </div>
            <div className="ml-4 flex flex-shrink-0">
              <button
                className="rounded-full border-gray-700 p-1 text-gray-800 transition-colors hover:bg-gray-200 "
                onClick={handleDismiss}
              >
                <CloseIcon className="h-2 w-2" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  );
};
