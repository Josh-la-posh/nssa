import { Link } from 'react-router-dom';

import { Button } from '@/components/Elements';
import { Checkbox, Form, Input, Select } from '@/components/Form';
import { env } from '@/config';
import { useApiResponseHandler, useNotification } from '@/hooks';
import Yup from '@/lib/yup';

import { useCountries, useSchoolAdminSignUp } from '../../api';

const validationSchema = Yup.object({
  firstName: Yup.string()
    .required()
    .label('First name')
    .matches(/^[^0-9]+$/, 'First name cannot contain numbers'),
  lastName: Yup.string()
    .required()
    .label('Last name')
    .matches(/^[^0-9]+$/, 'Last name cannot contain numbers'),
  email: Yup.string().trim().required().email().max(50).label('Email'),
  gender: Yup.string()
    .required()
    .label('gender')
    .matches(/^[^0-9]+$/, 'Gender cannot contain numbers'),
  country: Yup.string().required(),
  password: Yup.string()
    .required()
    .test('', 'Password cannot contain email address', function (password) {
      const value: boolean = this.parent.email
        ? password.toLowerCase().includes(this.parent.email.toLowerCase())
        : false;
      return !value;
    })
    .min(8)
    .max(50)
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z\d\s:])/,
      'Use at least 1 uppercase and lowercase letter, 1 number, and 1 symbol'
    )
    .label('Password'),
  // confirmPassword: Yup.string()
  //   .label('Confirm Password')
  //   .oneOf([Yup.ref('password')], 'Passwords does not match')
  //   .required('Please confirm your password'),

  agree: Yup.boolean().oneOf([true], 'Must agree to Terms and Conditions'),
});

type SignUpValues = Yup.InferType<typeof validationSchema>;

type SignUpFormProps = {
  onSuccess: () => void;
};

export const SignUpForm = ({ onSuccess }: SignUpFormProps) => {
  const notification = useNotification();
  const {
    data: countriesData,
    isFetching: countriesIsFetching,
    status: countriesStatus,
    error: countriesError,
  } = useCountries();
  const signUpMutation = useSchoolAdminSignUp();

  useApiResponseHandler({
    runFn: countriesStatus === 'error',
    fn: () => {
      notification.show({ type: 'error', message: countriesError?.message });
    },
  });

  const isLoading = signUpMutation.isPending;

  const handleSubmit = (values: Omit<SignUpValues, 'agree' | 'confirmPassword'>) => {
    signUpMutation.mutate(values, {
      onSuccess: () => {
        onSuccess();
      },
    });
  };

  return (
    <>
      <Form<SignUpValues, typeof validationSchema>
        onSubmit={handleSubmit}
        schema={validationSchema}
        initialValues={{}}
        className="space-y-4 mt-10 w-[80%] md:w-[339px]"
      >
        {({ register, formState }) => (
          <>
            <div className="flex gap-5 sm:flex-row">
              <Input
                width="full"
                disabled={isLoading}
                placeholder="Enter your first name"
                label="Admin First name"
                className="w-full"
                error={formState.errors['firstName']}
                registration={register('firstName')}
                autoCapitalize="words"
              />
              <Input
                width="full"
                disabled={isLoading}
                placeholder="Enter your last name"
                className="w-full"
                label="Admin Last name"
                error={formState.errors['lastName']}
                registration={register('lastName')}
                autoCapitalize="words"
              />
            </div>
            <Input
              disabled={isLoading}
              placeholder="Enter your email here"
              label="Email"
              error={formState.errors['email']}
              registration={register('email')}
            />
            <Select
              label="Gender"
              placeholder="select gender"
              options={[
                { label: 'Male', value: 'MALE' },
                { label: 'Female', value: 'FEMALE' },
              ]}
              error={formState.errors['gender']}
              registration={register('gender')}
            />
            <Select
              options={
                countriesData?.data?.map((country) => ({
                  label: country.name,
                  value: country.id,
                })) ?? []
              }
              canSearch
              width="full"
              placeholder="Select your country"
              label="Country"
              error={formState.errors.country}
              className="w-full"
              registration={register('country')}
              isLoading={countriesIsFetching}
            />
            <Input
              disabled={isLoading}
              placeholder="••••••••"
              type="password"
              label="Enter your password"
              error={formState.errors['password']}
              registration={register('password')}
              // onKeyUp={async () => {
              //   await trigger('confirmPassword');
              // }}
              autoComplete="new-password"
            />

            <div className="flex items-start justify-between gap-2 pb-[0px]">
              <Checkbox
                disabled={isLoading}
                error={formState.errors['agree']}
                registration={register('agree')}
                aria-label="Agree to terms of service and privacy policy"
                label={
                  <p className="text-black text-[12px] -mt-[2px] ml-1">
                    By creating an account you agree to the{' '}
                    <a
                      href={env.SEO_DOMAIN + '/terms'}
                      target="_blank"
                      rel="noreferrer"
                      className="underline text-blue-400"
                    >
                      terms of use
                    </a>{' '}
                    and our{' '}
                    <a
                      href={env.SEO_DOMAIN + '/policy'}
                      target="_blank"
                      rel="noreferrer"
                      className="underline text-blue-400"
                    >
                      privacy policy
                    </a>
                    .
                  </p>
                }
                labelClassName="inline-flex text-black dark:text-white gap-2 flex-row-reverse"
              />
            </div>
            <Button isLoading={isLoading} type="submit" className="w-full ">
              Sign up
            </Button>
          </>
        )}
      </Form>
      <p className="pt-2 text-center font-medium text-gray-700 text-[12px] w-[80%] md:w-[339px]">
        Already have an account?{' '}
        <Link to="/auth/login" className="font-semibold text-blue-400 hover:text-blue-500">
          Login
        </Link>
      </p>
    </>
  );
};
