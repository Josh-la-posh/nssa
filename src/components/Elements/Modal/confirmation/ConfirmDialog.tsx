import { ReactNode, useState } from 'react';

import { Button } from '../../Button';

type ConfirmDialogProps = {
  onCancel?: () => void;
  onSuccess: () => void;
  title?: ReactNode;
  description?: ReactNode;
};

export const ConfirmDialog = ({ onCancel, onSuccess, title, description }: ConfirmDialogProps) => {
  const [isLoading, setIsLoading] = useState(false);

  async function handleSuccess() {
    setIsLoading(true);
    await new Promise((resolve) => {
      resolve(onSuccess());
    });
    setIsLoading(false);
  }

  return (
    <div className="space-y-6 sm:min-w-[400px]">
      <div className="min-h-[80px]">
        <h1 className="pb-2 text-2xl font-semibold leading-tight text-blue-600 dark:text-white">
          {title}
        </h1>
        <p className="text-base text-gray-600 dark:text-gray-400">{description}</p>
      </div>

      <div className="flex flex-wrap justify-end gap-2">
        <Button
          className="sm:min-w-[120px]"
          isLoading={isLoading}
          size="md"
          onClick={handleSuccess}
        >
          Proceed
        </Button>

        <Button className="sm:min-w-[100px]" onClick={onCancel} size="md" variant="outlined">
          Cancel
        </Button>
      </div>
    </div>
  );
};
