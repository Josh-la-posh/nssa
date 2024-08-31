import clsx from 'clsx';

import { NumberCount, Skeleton } from '@/components/Elements';

type StatCardProps = {
  title: string;
  titleColor?: string;
  statValue: number;
  statValueColor: string;
  isLoading: boolean;
};
export const StatCard = ({
  title,
  titleColor,
  statValue,
  statValueColor,
  isLoading,
}: StatCardProps) => {
  return (
    <div className="shadow bg-white dark:bg-dark dark:text-dark px-8 pt-[9px] pb-[15px] rounded-md">
      <h3 className={clsx('text-[#7F8187] dark:text-white text-[10px] mb-2', titleColor)}>
        {title}
      </h3>
      {isLoading ? (
        <Skeleton />
      ) : (
        <p className={clsx('dark:text-white text-[24px] font-bold', statValueColor)}>
          <NumberCount value={statValue} />
        </p>
      )}
    </div>
  );
};
