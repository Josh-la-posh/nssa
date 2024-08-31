import clsx from 'clsx';
import * as React from 'react';

import { ReactComponent as WarningIcon } from '@/assets/icons/sync.svg';

type Content = 'icon' | 'body' | 'header';
type variants = 'warning' | 'success' | 'error';

const colorScheme: Record<variants, Record<Content, React.ReactNode>> = {
  warning: {
    icon: (
      <div className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded bg-blue-600 p-1">
        <WarningIcon className=" h-4 w-4 text-white" />
      </div>
    ),
    body: 'bg-blue-100 dark:text-blue-600',
    header: 'text-gray-900 px-0 py-0 font-semibold',
  },
  success: {
    icon: 'bg-blue-400 text-white shadow-sm shadow-blue-400',
    body: 'border border-blue-400 text-blue-400 hover:bg-blue-100',
    header: 'text-blue-400 px-0 py-0',
  },
  error: {
    icon: 'bg-blue-400 text-white shadow-sm shadow-blue-400',
    body: 'border border-blue-400 text-blue-400 hover:bg-blue-100',
    header: 'text-blue-400 px-0 py-0',
  },
};

type IconProps =
  | { startIcon: React.ReactElement; endIcon?: never }
  | { endIcon: React.ReactElement; startIcon?: never }
  | { endIcon?: undefined; startIcon?: undefined };

export type AdmonitionProps = {
  variant?: variants;
  children?: React.ReactNode;
  className?: string;
  title?: string;
  icon?: React.ReactNode;
} & IconProps;

export const Admonition = ({
  className = '',
  variant = 'warning',
  children,
  icon,
  title,
  ...props
}: AdmonitionProps) => {
  const Icon = colorScheme[variant].icon;
  return (
    <div
      className={clsx(
        'mb-4 flex gap-1 rounded-lg p-4 transition-all duration-200',
        colorScheme[variant].body,
        className
      )}
      {...props}
    >
      {icon ? (
        <div className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded bg-blue-600 p-1">
          {icon}
        </div>
      ) : (
        Icon
      )}
      <div className="inline-block">
        <span className={clsx(colorScheme[variant].header)}>{title} </span>
        {children}
      </div>
    </div>
  );
};
