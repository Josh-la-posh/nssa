import clsx from 'clsx';
import React, { FC, ReactNode } from 'react';

import { ReactComponent as ClockIcon } from '@/assets/icons/clock.svg';
import { ReactComponent as CheckIcon } from '@/assets/icons/rounded-check.svg';
import { ReactComponent as MinusIcon } from '@/assets/icons/rounded-minus.svg';
import { ReactComponent as QuestionIcon } from '@/assets/icons/rounded-question.svg';

const colorScheme: Record<ColorType, Record<variants, string>> = {
  success: {
    filled: 'border-status-success/20 bg-status-success/20 text-status-success',
    outlined: 'border border-status-success text-status-success',
    text: 'text-status-success p-0',
  },

  error: {
    filled: 'border-status-error/20 bg-status-error/20 text-status-error',
    outlined: 'border border-status-error text-status-error',
    text: 'text-status-error p-0',
  },

  warning: {
    filled: 'border-warning-500/20 bg-warning-500/20 text-warning-500',
    outlined: 'border border-warning-500 text-warning-500',
    text: 'text-warning-500 p-0',
  },

  info: {
    filled: 'border-blue-400/20 bg-blue-400/20 text-blue-400',
    outlined: 'border border-blue-400 text-blue-400',
    text: 'text-blue-400 p-0',
  },

  pending: {
    filled: 'border-[#BDBDBD] bg-[#BDBDBD] text-[#4F4F4F]',
    outlined: 'border border-[#4F4F4F] text-[#4F4F4F]',
    text: 'text-[#4F4F4F] p-0',
  },
};

export type ColorType = 'error' | 'success' | 'warning' | 'info' | 'pending';
type variants = 'filled' | 'outlined' | 'text';

const sizes = {
  xs: 'py-0.5 px-1 text-xs rounded-md',
  sm: 'py-1 px-2 text-sm rounded-lg',
  md: 'py-2 px-4 text-base rounded-lg',
  lg: 'py-2 px-6 text-lg rounded-lg',
};

type IconProps =
  | { startIcon: React.ReactNode; endIcon?: never }
  | { endIcon: React.ReactElement; startIcon?: never }
  | { endIcon?: undefined; startIcon?: undefined };

const icons = {
  error: <MinusIcon className="h-4 w-4" />,
  success: <CheckIcon className="h-4 w-4" />,
  warning: <ClockIcon className="h-4 w-4" />,
  info: <QuestionIcon className="h-4 w-4" />,
  pending: <ClockIcon className="h-4 w-4" />,
};

export type TagProps = {
  variant?: variants;
  size?: keyof typeof sizes;
  color?: ColorType;
  className?: string;
  hideStartIcon?: boolean;
  hideEndIcon?: boolean;
  label: ReactNode;
} & IconProps;

export const Tag: FC<TagProps> = (props) => {
  const {
    label,
    color = 'success',
    variant = 'filled',
    size = 'sm',
    startIcon,
    hideStartIcon = false,
    endIcon,
    hideEndIcon = false,
    className,
    ...restProps
  } = props;
  return (
    <div
      className={clsx(
        className,
        'inline-flex cursor-default items-center justify-center font-semibold capitalize transition-all duration-200 focus:outline-none disabled:cursor-not-allowed disabled:opacity-70',
        colorScheme[color][variant],
        sizes[size]
      )}
      {...restProps}
    >
      {!hideStartIcon && <span className="mr-1">{startIcon ?? icons[color]}</span>}
      <span className="">{label}</span>
      {!hideEndIcon && endIcon && <span className="ml-1">{endIcon}</span>}
    </div>
  );
};
