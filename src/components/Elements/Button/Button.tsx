import clsx from 'clsx';
import * as React from 'react';
import { forwardRef } from 'react';
import { Link, LinkProps } from 'react-router-dom';

import { Spinner } from '@/components/Elements/Spinner';

const colorScheme: Record<colorType, Record<variants, string>> = {
  primary: {
    filled:
      'bg-blue-400 text-white border-blue-400 shadow-sm shadow-blue-400/30 disabled:bg-[#C7C7C7]',
    outlined: 'border border-blue-400 text-blue-400 hover:bg-blue-100 disabled:bg-[#C7C7C7]',
    text: 'text-blue-400 px-0 py-0',
  },

  secondary: {
    filled: 'bg-blue-100 text-white shadow-md shadow-blue-100 disabled:bg-[#C7C7C7]',
    outlined: 'border border-gray-700 text-gray-700 hover:bg-blue-100 disabled:bg-[#C7C7C7]',
    text: 'text-blue-100 px-0 py-0',
  },

  tertiary: {
    filled: 'bg-blue-100 shadow-md shadow-blue-100 disabled:bg-[#C7C7C7]',
    outlined:
      'border border-blue-100 text-blue-100 hover:bg-blue-100 hover:text-white disabled:bg-[#C7C7C7]',
    text: 'text-blue-100 px-0 py-0',
  },
};

type colorType = 'primary' | 'secondary' | 'tertiary';
type variants = 'filled' | 'outlined' | 'text';

const sizes = {
  xs: {
    text: 'text-xs font-medium rounded-lg',
    filled: 'py-2 px-3 text-sm font-medium rounded-lg',
    outlined: 'py-2 px-3 text-sm font-medium rounded-lg',
  },
  sm: {
    text: 'text-sm font-medium rounded-lg',
    filled: 'py-2 px-3 text-sm font-medium rounded-lg',
    outlined: 'py-2 px-3 text-sm font-medium rounded-lg',
  },
  md: {
    text: 'text-base font-semibold rounded-lg',
    filled: 'py-2.5 px-5 text-base font-semibold rounded-lg',
    outlined: 'py-2.5 px-5 text-base font-semibold rounded-lg',
  },
  lg: {
    text: 'text-lg font-semibold rounded-lg',
    filled: 'py-3 px-5 text-lg font-semibold rounded-lg',
    outlined: 'py-3 px-5 text-lg font-semibold rounded-lg',
  },
  xl: {
    text: 'text-lg font-semibold rounded-lg',
    filled: 'py-3.5 px-6 text-lg font-semibold rounded-lg',
    outlined: 'py-3.5 px-6 text-lg font-semibold rounded-lg',
  },
};

type IconProps =
  | { startIcon: React.ReactElement; endIcon?: never }
  | { endIcon: React.ReactElement; startIcon?: never }
  | { endIcon?: undefined; startIcon?: undefined };

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: variants;
  size?: keyof typeof sizes;
  isLoading?: boolean;
  color?: colorType;
} & IconProps;

const MainButton = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      type = 'button',
      className = '',
      color = 'primary',
      variant = 'filled',
      size = 'md',
      isLoading = false,
      startIcon,
      endIcon,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={props.disabled || isLoading}
        type={type}
        className={clsx(
          'inline-flex items-center justify-center transition-all duration-200 hover:opacity-80 focus:outline-none disabled:cursor-not-allowed  disabled:opacity-70',
          sizes[size][variant],
          colorScheme[color][variant],
          className
        )}
        {...props}
      >
        {startIcon && <span className={clsx(props.children ? 'mr-2' : 'mr-0')}>{startIcon}</span>}
        <span>{props.children}</span>
        {endIcon && <span className={clsx(props.children ? 'ml-2' : 'ml-0')}>{endIcon}</span>}
        {isLoading && (
          <Spinner
            size="sm"
            className="text-current ml-2"
            variant={variant === 'filled' ? 'light' : 'primary'}
          />
        )}
      </button>
    );
  }
);

// Button Link
export type ButtonLinkProps = LinkProps & {
  variant?: variants;
  size?: keyof typeof sizes;
  isLoading?: boolean;
  color?: colorType;
} & IconProps;

type LinkRef = HTMLAnchorElement;

const ButtonLink = forwardRef<LinkRef, ButtonLinkProps>(
  (
    {
      type = 'button',
      className = '',
      color = 'primary',
      variant = 'filled',
      size = 'md',
      isLoading = false,
      startIcon,
      endIcon,
      ...props
    },
    ref
  ) => {
    return (
      <Link
        ref={ref}
        type={type}
        className={clsx(
          'inline-flex items-center justify-center transition-all duration-200 hover:opacity-80 focus:outline-none disabled:cursor-not-allowed disabled:opacity-70',
          colorScheme[color][variant],
          sizes[size][variant],
          className
        )}
        {...props}
      >
        {isLoading && (
          <Spinner
            size="sm"
            className="text-current"
            variant={variant === 'filled' ? 'light' : 'primary'}
          />
        )}
        {startIcon && <span className={clsx(props.children ? 'mr-2' : 'mr-0')}>{startIcon}</span>}
        <span>{props.children}</span>
        {endIcon && <span className={clsx(props.children ? 'ml-2' : 'ml-0')}>{endIcon}</span>}
      </Link>
    );
  }
);

ButtonLink.displayName = 'ButtonLink';

MainButton.displayName = 'Button';

export const Button = Object.assign(MainButton, { Link: ButtonLink });
