import { ReactNode } from 'react';

import { ReactComponent as SuccessIcon } from '@/assets/illustrations/success.svg';

import { Button } from '../../Button';

type SuccessProps = {
  onCancel?: () => void;
  onSuccess?: () => void;
  title?: ReactNode;
  description?: ReactNode;
};

export const Success = ({ title, description, onSuccess }: SuccessProps) => {
  return (
    <div className="space-y-4 sm:min-w-[400px]">
      <SuccessIcon className="w-max mx-auto" />
      <div className="min-h-[80px] text-center">
        <h1 className="pb-2 text-2xl font-semibold leading-tight text-[#212121] dark:text-white">
          {title}
        </h1>
        <p className="text-base text-[#333333] dark:text-gray-400">{description}</p>
      </div>

      <Button size="md" type="button" className="w-full" onClick={onSuccess}>
        Continue
      </Button>
    </div>
  );
};
