import { FC, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { Button } from '@/components/Elements';
import { OTPInput } from '@/components/Form';
import { useApiResponseHandler, useCountdown, useNotification } from '@/hooks';
import { useAuth } from '@/lib/auth';

import { useConfirmEmail, useResendVerificationEmail } from '../../api';
import { ReactComponent as ArrowLeftSvg } from '../../assets/icons/arrow-left.svg';

type ConfirmEmailFormProps = {
  onSuccess: () => void;
  errorVerifyingEmailToken: boolean;
  resetErrorVerifyingEmailToken: () => void;
};

export const ConfirmEmailForm: FC<ConfirmEmailFormProps> = ({
  onSuccess,
  errorVerifyingEmailToken,
  resetErrorVerifyingEmailToken,
}) => {
  const {
    user,
    actions: { logout },
  } = useAuth();

  const location = useLocation();

  const notification = useNotification();

  const [value, resetValue, isComplete] = useCountdown(60);

  const [otpValue, setOtpValue] = useState('');

  const confirmEmail = useConfirmEmail();

  const resendCode = useResendVerificationEmail({
    config: {
      enabled: false,
    },
  });

  const resendCodeQueryOnError = useApiResponseHandler;
  const resendCodeQueryOnSuccess = useApiResponseHandler;

  resendCodeQueryOnError({
    runFn: resendCode.isError,
    fn: () => {
      notification.show({ type: 'error', message: resendCode.data?.message || '' });
    },
  });

  resendCodeQueryOnSuccess({
    runFn: resendCode.isSuccess,
    fn: () => {
      notification.show({ type: 'success', message: resendCode.data?.message || '' });
    },
  });

  const handleSubmit = async () => {
    confirmEmail.mutate(otpValue, {
      onSuccess() {
        onSuccess();
      },
    });
  };

  const handleResend = async () => {
    resetErrorVerifyingEmailToken();
    await resendCode.refetch();
    resetValue();
  };

  useEffect(() => {
    if (location.state?.resend) {
      handleResend();
      location.state.resend = false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   if (errorVerifyingEmailToken) {
  //     resetValue();
  //   }
  // }, [errorVerifyingEmailToken, resetValue]);

  return (
    <>
      <h3 className="text-center text-[#4F4F4F] text-[29px] font-semibold mb-4">
        Check your email
      </h3>
      <p className="text-[#B3B3B4] text-center text-[12px] font-medium max-w-[162px]">
        We sent a verification link to {user?.email}
      </p>
      <div className="mt-[38px] flex flex-col items-center justify-center">
        <OTPInput
          value={otpValue}
          type="numeric"
          onChange={(e) => setOtpValue(e.target.value)}
          length={6}
          disabled={confirmEmail.isPending}
          className="mb-[22px]"
        />
        <Button
          onClick={handleSubmit}
          className="w-full"
          isLoading={confirmEmail.isPending}
          disabled={otpValue.length < 6}
        >
          Confirm
        </Button>
        <div className="flex flex-col items-center gap-4 mt-[17px]">
          <p>
            Not receive OTP code?{' '}
            <Button
              disabled={
                errorVerifyingEmailToken
                  ? false
                  : confirmEmail.isPending || resendCode.isLoading || !isComplete
              }
              variant="text"
              isLoading={resendCode.isFetching}
              onClick={handleResend}
              className="px-0 font-medium text-[#FFB73E]"
            >
              Resend OTP
            </Button>
            {!isComplete && (
              <span className="animate-pulse pl-4 text-sm font-semibold text-[#FFB73E]">
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
              </span>
            )}
          </p>
          <Button
            onClick={() => logout('/auth/login')}
            startIcon={<ArrowLeftSvg />}
            variant="text"
            disabled={resendCode.isLoading}
          >
            Back to Login
          </Button>
        </div>
      </div>
    </>
  );
};
