import clsx from 'clsx';

const sizes = {
  xs: {
    circumference: 22,
    svgSize: 'h-12 w-12',
    textSize: 'text-xs',
    stroke: 3,
    cxy: 23.5,
  },

  sm: {
    circumference: 31,
    svgSize: 'h-20 w-20',
    textSize: 'text-sm',
    stroke: 5,
    cxy: 38,
  },

  md: {
    circumference: 44,
    svgSize: 'h-24 w-24',
    textSize: 'text-lg',
    stroke: 8,
    cxy: 48,
  },

  lg: {
    circumference: 60,
    svgSize: 'h-32 w-32',
    textSize: 'text-2xl',
    stroke: 9,
    cxy: 64,
  },

  xl: {
    circumference: 70,
    svgSize: 'h-40 w-40',
    textSize: 'text-3xl',
    cxy: 80,
    stroke: 10,
  },
};

type CircularProgressProps = {
  hideLabel?: boolean;
  size?: keyof typeof sizes;
  percent: number;
  color?: string;
};

export const CircularProgress = ({
  hideLabel,
  percent = 0,
  color = '#F8700D',
  size = 'xl',
}: CircularProgressProps) => {
  const circumference = sizes[size].circumference * 2 * Math.PI;
  const colorSc = `text-[${color}]`;

  return (
    <div className="relative flex min-w-max items-center justify-center overflow-hidden rounded-full bg-white dark:bg-inherit">
      <svg className={sizes[size].svgSize} aria-hidden="true">
        <circle
          className="text-gray-200 shadow-md transition dark:text-gray-600"
          strokeWidth={sizes[size].stroke + 1}
          stroke="currentColor"
          fill="transparent"
          r={sizes[size].circumference}
          cx={sizes[size].cxy}
          cy={sizes[size].cxy}
        />
        <circle
          className="text-white shadow-md transition dark:text-blue-600"
          strokeWidth={sizes[size].stroke}
          strokeDasharray={circumference}
          strokeDashoffset={circumference - (percent / 100) * circumference}
          strokeLinecap="round"
          stroke={color}
          fill="transparent"
          r={sizes[size].circumference}
          cx={sizes[size].cxy}
          cy={sizes[size].cxy}
        />
      </svg>
      {!hideLabel && (
        <span
          className={clsx(colorSc, sizes[size].textSize, 'absolute font-semibold ')}
        >{`${percent}%`}</span>
      )}
    </div>
  );
};
