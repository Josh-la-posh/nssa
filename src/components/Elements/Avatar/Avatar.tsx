import clsx from 'clsx';
import { useState } from 'react';

const sizes = {
  xs: 'h-4 w-4 text-xs',
  sm: 'h-8 w-8 text-sm',
  md: 'h-10 w-10 text-md',
  lg: 'h-16 w-16 text-lg',
  xl: 'h-24 w-24 text-xl',
};

const SVGsizes = {
  xs: 'h-5 w-5',
  sm: 'h-10 w-10',
  md: 'h-12 w-12',
  lg: 'h-20 w-20',
  xl: 'h-32 w-32',
};

const variants = {
  'rounded-bordered': 'rounded-full ring-2 ring-gray-200 dark:ring-gray-300',
  'squared-bordered': 'rounded-md p-1 border',
  rounded: 'rounded-full',
  squared: 'rounded-md',
};

type AvatarProps = {
  name?: string;
  src?: string;
  status?: 'online' | 'offline' | null;
  size?: keyof typeof sizes;
  variant?: keyof typeof variants;
  className?: string;
  textClassName?: string;
};

const ImagePlaceholder = (props: AvatarProps) => {
  const { size = 'md', variant = 'rounded-bordered', className } = props;

  return (
    <div
      className={clsx(
        variants[variant],
        sizes[size],
        'relative inline-flex flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-100 dark:bg-gray-600',
        className
      )}
    >
      <svg
        className={clsx(SVGsizes[size], 'absolute text-gray-400 ')}
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
          clipRule="evenodd"
        ></path>
      </svg>
    </div>
  );
};

const getInitials = (name: string) =>
  name
    .split(' ')
    .map((n, i, a) => (i === 0 || i + 1 === a.length ? n[0] : null))
    .join('');

const Initals = (props: AvatarProps) => {
  const { size = 'md', name = '', variant = 'rounded-bordered', className, textClassName } = props;
  return (
    <div
      className={clsx(
        variants[variant],
        sizes[size],
        'z-0 inline-flex flex-shrink-0 items-center justify-center overflow-hidden bg-gray-100 dark:bg-gray-600',
        className
      )}
    >
      <span
        className={clsx('uppercase font-medium text-gray-600 dark:text-gray-300', textClassName)}
      >
        {getInitials(name)}
      </span>
    </div>
  );
};

export const Avatar = (props: AvatarProps) => {
  const { src = '', status, size = 'md', name, variant = 'rounded-bordered', className } = props;
  const [showPlaceholder] = useState(!name && !src);
  const [showInitials, setShowInitials] = useState(!src);

  if (showPlaceholder) {
    return (
      <div className="relative">
        {status && (
          <span
            className={clsx(
              'absolute bottom-[-2%] left-[85%] h-2.5 w-2.5 transform rounded-full border border-white',
              status === 'online' ? 'bg-status-success' : 'bg-danger-300'
            )}
          />
        )}
        <ImagePlaceholder {...props} />
      </div>
    );
  }

  if (showInitials) {
    return (
      <div className="relative">
        {status && (
          <span
            className={clsx(
              'absolute bottom-[-2%] left-[85%] h-2.5 w-2.5 transform rounded-full border border-white',
              status === 'online' ? 'bg-status-success' : 'bg-danger-300'
            )}
          />
        )}
        <Initals {...props} />
      </div>
    );
  }

  return (
    <div className="relative inline-flex flex-shrink-0">
      {status && (
        <span
          className={clsx(
            'absolute bottom-[-2%] left-[85%] h-2.5 w-2.5 transform rounded-full border border-white',
            status === 'online' ? 'bg-status-success' : 'bg-danger-300'
          )}
        />
      )}
      <img
        className={clsx('text-xs object-cover', variants[variant], sizes[size], className)}
        src={src}
        alt={name}
        onError={() => setShowInitials(true)}
        {...props}
      />
    </div>
  );
};

type AvatarGroupProps = Omit<AvatarProps, 'name' | 'src'> & {
  children: ChildProps[];
  onViewMore?: () => void;
  maxLength?: number;
};

type ChildProps = {
  props: AvatarProps;
};

export const AvatarStack = (props: AvatarGroupProps) => {
  const { children, onViewMore, maxLength = 3, size = 'md', variant = 'rounded-bordered' } = props;

  return (
    <div className="flex-shrink-0">
      <div
        className={clsx(
          'flex items-center',
          size === ('xs' || 'sm') ? '-space-x-1.5' : '-space-x-3.5'
        )}
      >
        {Array.isArray(children) ? (
          <>
            {children.slice(0, maxLength).map((child, index) => {
              return <Avatar key={index} size={size} variant={variant} {...child.props} />;
            })}
            {children.length > maxLength && (
              <button
                onClick={onViewMore}
                disabled={!onViewMore}
                className={clsx(
                  variants[variant],
                  'relative inline-flex items-center justify-center overflow-hidden rounded-full bg-gray-100 dark:bg-gray-600',
                  sizes[size]
                )}
              >
                <span className="font-semibold text-gray-600 dark:text-gray-300">
                  {'+' + (children.length - maxLength)}
                </span>
              </button>
            )}
          </>
        ) : (
          children
        )}
      </div>
    </div>
  );
};
