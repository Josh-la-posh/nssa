import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Button } from '@/components/Elements';
import { useCountdown } from '@/hooks';

import { useForgotPassword } from '../../api/requests/forgotPassword';

type CheckYourEmailProps = {
  onSuccess?: () => void;
};

export const CheckYourEmail: FC<CheckYourEmailProps> = () => {
  const resendForgotPasswordMutation = useForgotPassword();
  const isLoading = resendForgotPasswordMutation.isPending;

  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;
  const [value, resetValue, isComplete] = useCountdown(60);

  const handleResend = () => {
    resendForgotPasswordMutation.mutate(
      { email },
      {
        onSuccess: () => {
          resetValue();
          navigate('/auth/reset-password');
        },
      }
    );
  };

  return (
    <div className="pt-6">
      {/* <CheckYourEmailSvg className="mx-auto mb-6 animate-pulse" /> */}
      <div className="pb-6 text-center">
        <h2 className="pb-2 text-2xl font-bold text-gray-900">Check your email</h2>
        <p className="text-gray-800">
          We sent a password reset to <span className="font-semibold">{email}.</span>
        </p>
      </div>

      <div className="mt-6 space-y-8 text-center">
        <p className="text-center">
          Didn&apos;t receive an email
          <Button
            onClick={handleResend}
            isLoading={isLoading}
            disabled={!isComplete}
            variant="text"
            className="ml-4 px-0 font-medium text-blue-400 outline-none"
          >
            Resend
          </Button>
        </p>
        {!isComplete && (
          <p className="mt-4 animate-pulse text-sm font-semibold text-blue-400">
            {value.minutes.toLocaleString('en-US', {
              minimumIntegerDigits: 2,
              useGrouping: false,
            })}
            m :
            {value.seconds.toLocaleString('en-US', {
              minimumIntegerDigits: 2,
              useGrouping: false,
            })}
            s
          </p>
        )}
      </div>
    </div>
  );
};
