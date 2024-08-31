import { Link } from 'react-router-dom';

import { Button } from '@/components/Elements';
import { Checkbox, Input } from '@/components/Form';
import Yup from '@/lib/yup';

import { Form } from '../../../../components/Form/Form';
import { LoginCredentialsDTO, useLoginWithEmailAndPassword } from '../../api';

const validationSchema = Yup.object({
  email: Yup.string().required().email().trim().label('Email'),
  password: Yup.string().required().label('Password'),
  rememberMe: Yup.boolean().default(false).label('Remember Me'),
});

type LoginFormProps = {
  onSuccess: () => void;
};

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const loginMutation = useLoginWithEmailAndPassword();

  const isLoading = loginMutation.isPending;

  const handleSubmit = (values: LoginCredentialsDTO) => {
    loginMutation.mutateAsync(values, {
      onSuccess: () => {
        onSuccess();
      },
    });
  };
  return (
    <div className="w-[80%] md:w-[339px]">
      <Form<LoginCredentialsDTO, typeof validationSchema>
        schema={validationSchema}
        initialValues={{
          rememberMe: true,
        }}
        className="space-y-4"
        onSubmit={handleSubmit}
      >
        {({ register, formState }) => (
          <>
            <div className="space-y-5">
              <Input
                placeholder="user@example.com"
                label="Email Address"
                disabled={isLoading}
                error={formState.errors['email']}
                registration={register('email')}
              />
              <Input
                placeholder="••••••••"
                type="password"
                label="Password"
                name="password"
                disabled={isLoading}
                error={formState.errors['password']}
                registration={register('password')}
              />

              <div className="flex items-center justify-between pb-0">
                <Checkbox
                  disabled={isLoading}
                  registration={register('rememberMe')}
                  error={formState.errors['rememberMe']}
                  label="Remember for 30 days"
                  className="mt-[3px]"
                  labelClassName="inline-flex text-black dark:text-white gap-2 flex-row-reverse w-full items-center"
                />

                <Link
                  to="/auth/forgot-password"
                  className="text-sm font-medium text-blue-400 -mt-[1px]"
                >
                  Forgot password?
                </Link>
              </div>
            </div>
            <div className="">
              {/* <SocialAuthButtons disabled={isLoading} type="signin" /> */}

              <div className="flex items-center justify-between gap-4">
                {/* <div className="h-px w-full bg-gray-200" />
                <p className="text-center text-sm font-medium text-gray-500 before:w-full before:bg-status-error before:content-[/]">
                  Or
                </p> */}
                {/* <div className="h-px w-full bg-gray-200" /> */}
              </div>
              <Button type="submit" isLoading={isLoading} className="w-full mt-3">
                Sign In
              </Button>
            </div>
          </>
        )}
      </Form>
    </div>
  );
};
