import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Button } from '@/components/Elements';
import { Form, Input } from '@/components/Form';
import { useAuth } from '@/lib/auth';
import Yup from '@/lib/yup';

import { useForgotPassword } from '../../api';
import { ReactComponent as ArrowLeftSvg } from '../../assets/icons/arrow-left.svg';

const validationSchema = Yup.object({
  email: Yup.string().email().max(50).required().label('Email'),
});

type LoginValues = {
  email: string;
};

type ForgotPasswordFormProp = {
  onSuccess: () => void;
};

export const ForgotPasswordForm = ({ onSuccess }: ForgotPasswordFormProp) => {
  const forgotPasswordMutation = useForgotPassword();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const [email, setEmail] = useState('');

  const isLoading = forgotPasswordMutation.isPending;

  const handleSubmit = (values: LoginValues) => {
    setEmail(values.email);
    forgotPasswordMutation.mutate(values, {
      onSuccess: () => {
        onSuccess();
      },
    });
  };

  useEffect(() => {
    navigate('.', { replace: true, state: { email } }); // <-- redirect to current path w/o state
  }, [email, navigate]);

  return (
    <div className="flex flex-col items-center max-w-[339px]">
      <h2 className="text-center text-[20px] sm:text-[29px] text-[#4F4F4F] mb-4 font-semibold">
        Forgot Password?
      </h2>
      <p className="text-[#B3B3B4] text-[12px] font-medium text-center max-w-[195px] mb-[27px]">
        Enter email to receive instructions to reset password
      </p>
      <Form<LoginValues, typeof validationSchema>
        onSubmit={handleSubmit}
        schema={validationSchema}
        initialValues={{
          email: user?.email || location.state?.email,
        }}
        className="space-y-5 w-full"
      >
        {({ register, formState }) => (
          <>
            <div className="space-y-5">
              <Input
                placeholder="user@mail.com"
                type="email"
                disabled={isLoading}
                label="Enter your email address"
                name="email"
                error={formState.errors['email']}
                registration={register('email')}
              />
            </div>

            <Button type="submit" className="w-full" isLoading={isLoading}>
              Send Reset Link
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
