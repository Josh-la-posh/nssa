import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Button, Spinner } from '@/components/Elements';
import { Form, Input } from '@/components/Form';
import Yup from '@/lib/yup';

import { useResetPassword, useResetPasswordTokenValidity } from '../../api';
import { ReactComponent as ArrowLeftSvg } from '../../assets/icons/arrow-left.svg';

const validationSchema = Yup.object({
  password: Yup.string()
    .required()
    .min(8)
    .max(50)
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z\d\s:])/,
      'Use at least 1 uppercase and lowercase letter, 1 number, and 1 symbol'
    )
    .label('Password'),
  confirm_password: Yup.string()
    .required()
    .label('Confirm Password')
    .oneOf([Yup.ref('password')], 'Passwords does not match'),
});

type ResetPasswordValues = Yup.InferType<typeof validationSchema>;

type ResetPasswordFormProps = {
  onSuccess: () => void;
};

export const ResetPasswordForm = ({ onSuccess }: ResetPasswordFormProps) => {
  const resetPasswordMutation = useResetPassword();

  const { mutate: tokenMutate, isPending: tokenLoading } = useResetPasswordTokenValidity();
  const [searchParams] = useSearchParams();
  const queryParams = Object.fromEntries(searchParams);

  const isLoading = resetPasswordMutation.isPending;

  const handleSubmit = (values: ResetPasswordValues) => {
    resetPasswordMutation.mutate(
      { token: queryParams.token || '', password: values.password },
      {
        onSuccess: () => {
          onSuccess();
        },
      }
    );
  };

  useEffect(() => {
    queryParams.token && tokenMutate({ token: queryParams.token });
  }, [queryParams.token, tokenMutate]);

  if (tokenLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center pt-32">
        {/* <p className="text-sm font-semibold">Checking reset password link...</p> */}
        <Spinner variant="primary" size="sm" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center max-w-[339px]">
      <h2 className="text-center text-[20px] sm:text-[29px] text-[#4F4F4F] mb-4 font-semibold">
        Reset Password
      </h2>
      <Form<ResetPasswordValues, typeof validationSchema>
        onSubmit={handleSubmit}
        schema={validationSchema}
        initialValues={{}}
        className="space-y-4"
      >
        {({ register, formState, trigger }) => (
          <>
            <div className="space-y-5">
              <Input
                placeholder="••••••••"
                type="password"
                label="New Password"
                disabled={isLoading}
                error={formState.errors['password']}
                registration={register('password')}
                onKeyUp={async () => {
                  await trigger('confirm_password');
                }}
                autoComplete="new-password"
              />
              <Input
                placeholder="••••••••"
                type="password"
                label="Confirm Password"
                disabled={isLoading}
                error={formState.errors['confirm_password']}
                registration={register('confirm_password')}
                autoComplete="off"
              />
            </div>

            <Button type="submit" className="w-full" isLoading={isLoading}>
              Save
            </Button>
            <Button.Link
              to="/auth/login"
              startIcon={<ArrowLeftSvg />}
              variant="text"
              className="w-full"
              isLoading={isLoading}
            >
              Go back to Login
            </Button.Link>
          </>
        )}
      </Form>
    </div>
  );
};
