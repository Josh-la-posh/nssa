import { FC } from 'react';

import { Button } from '@/components/Elements';

import { ReactComponent as Success } from '../../assets/illustrations/check.svg';

type ResetPasswordSuccessProps = {
  onSuccess?: () => void;
};

export const ResetPasswordSuccess: FC<ResetPasswordSuccessProps> = () => {
  return (
    <div className="pt-12 text-center">
      <Success className="mx-auto mb-6 animate-pulse" />
      <div className="mt-[42px]">
        <h2 className="pb-2 text-2xl font-bold text-[#212121]">
          You have successfully reset your password
        </h2>
      </div>

      <div className="mt-10 space-y-8">
        <div className="text-center">
          <Button.Link to="/auth/login" variant="filled" replace>
            Continue
          </Button.Link>
        </div>
      </div>
    </div>
  );
};
