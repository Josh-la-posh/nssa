import { Transition } from '@headlessui/react';
import clsx from 'clsx';
import { useState, useEffect, Fragment, useRef } from 'react';

export const NetworkIndicator = () => {
  const initialRender = useRef(true);
  const [status, setStatus] = useState(() => {
    if (navigator.onLine) {
      return true;
    } else {
      return false;
    }
  });
  const [show, setShow] = useState(false);

  useEffect(() => {
    window.ononline = () => {
      setStatus(true);
    };
    window.onoffline = () => {
      setShow(false);
      setStatus(false);
    };
  }, [status]);

  useEffect(() => {
    const onlineTimer = setTimeout(
      () => {
        if (status) {
          if (initialRender.current) {
            initialRender.current = false;
          }
          setShow(false);
        } else {
          setShow((isShowing) => !isShowing);
        }
      },
      status ? 4000 : 500
    );

    return () => {
      clearTimeout(onlineTimer);
    };
  }, [status]);

  return (
    <>
      <Transition
        appear={true}
        as={Fragment}
        show={show}
        enter="transform ease-out duration-500 transition"
        enterFrom="-translate-y-4 opacity-0"
        enterTo="translate-y-0 opacity-100"
        leave="transition ease-in duration-500"
        leaveFrom="opacity-100 -translate-y-2"
        leaveTo="opacity-0 -translate-y-6 "
      >
        <div className={clsx('fixed top-4 z-50 flex w-full items-center justify-center')}>
          <p
            className={clsx(
              'inline-flex items-center gap-2 rounded-full border-none px-6 py-2 text-center text-xs font-medium text-white shadow-sm ',
              status ? ' bg-status-success' : 'bg-status-error'
            )}
          >
            {status ? (
              <>
                Connected to network <Connect />
              </>
            ) : (
              <>
                Network connection lost <Disconnect />
              </>
            )}
          </p>
        </div>
      </Transition>
    </>
  );
};

const Disconnect = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor">
    <path d="M6 0a.5.5 0 0 1 .5.5V3h3V.5a.5.5 0 0 1 1 0V3h1a.5.5 0 0 1 .5.5v3A3.5 3.5 0 0 1 8.5 10c-.002.434-.01.845-.04 1.22-.041.514-.126 1.003-.317 1.424a2.083 2.083 0 0 1-.97 1.028C6.725 13.9 6.169 14 5.5 14c-.998 0-1.61.33-1.974.718A1.922 1.922 0 0 0 3 16H2c0-.616.232-1.367.797-1.968C3.374 13.42 4.261 13 5.5 13c.581 0 .962-.088 1.218-.219.241-.123.4-.3.514-.55.121-.266.193-.621.23-1.09.027-.34.035-.718.037-1.141A3.5 3.5 0 0 1 4 6.5v-3a.5.5 0 0 1 .5-.5h1V.5A.5.5 0 0 1 6 0zM5 4v2.5A2.5 2.5 0 0 0 7.5 9h1A2.5 2.5 0 0 0 11 6.5V4H5z" />
  </svg>
);

const Connect = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor">
    <path d="M6 0a.5.5 0 0 1 .5.5V3h3V.5a.5.5 0 0 1 1 0V3h1a.5.5 0 0 1 .5.5v3A3.5 3.5 0 0 1 8.5 10c-.002.434-.01.845-.04 1.22-.041.514-.126 1.003-.317 1.424a2.083 2.083 0 0 1-.97 1.028C6.725 13.9 6.169 14 5.5 14c-.998 0-1.61.33-1.974.718A1.922 1.922 0 0 0 3 16H2c0-.616.232-1.367.797-1.968C3.374 13.42 4.261 13 5.5 13c.581 0 .962-.088 1.218-.219.241-.123.4-.3.514-.55.121-.266.193-.621.23-1.09.027-.34.035-.718.037-1.141A3.5 3.5 0 0 1 4 6.5v-3a.5.5 0 0 1 .5-.5h1V.5A.5.5 0 0 1 6 0z" />
  </svg>
);
