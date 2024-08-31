import { ReactNode } from 'react';

import { ReactComponent as ErrorIcon } from '@/assets/illustrations/error.svg';

import { Button } from '../../Button';

type ErrorProps = {
  onCancel?: () => void;
  onSuccess?: () => void;
  title?: ReactNode;
  description?: ReactNode;
};

export const Error = ({ title, description, onSuccess }: ErrorProps) => {
  return (
    <div className="space-y-4 sm:min-w-[400px]">
      <ErrorIcon className="mx-auto w-max" />
      <div className="min-h-[80px] text-center">
        <h1 className="pb-2 text-2xl font-semibold leading-tight text-blue-600 dark:text-white">
          {title}
        </h1>
        <p className="text-base text-gray-600 dark:text-gray-400">{description}</p>
      </div>

      <Button size="md" type="button" className="w-full" onClick={onSuccess}>
        Try again
      </Button>
    </div>
  );
};
