import clsx from 'clsx';
import { FC } from 'react';

const variants = {
  text: '',
  rounded: ',',
  circular: '',
  rectangular: '',
};

type SkeletonProps = {
  variant?: keyof typeof variants;
  className?: string;
  maxNumberOfWords?: number;

  numberOfLines?: number;
};

const text = ['w-2/5', 'w-3/5', 'w-4/5', 'w-1/5', 'w-full'];
export const Skeleton: FC<SkeletonProps> = ({ numberOfLines, className, maxNumberOfWords = 1 }) => {
  return (
    <div role="status" className="animate-pulse">
      {[...Array(numberOfLines).keys()].map((line) => (
        <div key={line} role="status" className="animate-pulse py-1.5">
          <div className="flex w-full items-center gap-x-1 gap-y-2">
            {[...Array(Math.floor(Math.random() * maxNumberOfWords) + 1).keys()].map((x, index) => (
              <div
                key={x + index}
                className={clsx(
                  'h-2.5 w-2/5 rounded-full bg-gray-300 dark:bg-gray-700',
                  text[Math.floor(Math.random() * text.length)],
                  className
                )}
              />
            ))}
          </div>
        </div>
      ))}
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export const SkeletonCircular: FC<SkeletonProps> = () => {
  return (
    <div role="status" className="inline-block animate-pulse">
      <div className="h-14 w-14 rounded-full bg-gray-300 dark:bg-gray-700" />
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export const SkeletonRounded: FC<SkeletonProps> = () => {
  return (
    <div role="status" className="block animate-pulse">
      <div className="mb-4 flex h-48 w-full items-center justify-center rounded bg-gray-300 dark:bg-gray-700" />
      <span className="sr-only">Loading...</span>
    </div>
  );
};
