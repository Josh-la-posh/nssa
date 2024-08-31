import clsx from 'clsx';

const sizes = {
  sm: 'h-1',
  md: 'h-2',
  lg: 'h-4',
};

type Props = {
  size?: keyof typeof sizes;
  animate?: boolean;
  percentage: number;
  bgColor?: string;
  color?: string;
};

export const ProgressBar = ({
  size = 'md',
  bgColor = 'bg-gray-200 dark:bg-gray-700',
  color = 'bg-blue-400',
  animate,
  percentage,
}: Props) => {
  return (
    <div className={clsx('w-full rounded-full ', bgColor, sizes[size])}>
      <div
        className={clsx(
          ' rounded-full transition',
          sizes[size],
          color,
          animate ? 'animate-pulse' : ''
        )}
        style={{ width: `${percentage || 0}%` }}
      />
    </div>
  );
};
