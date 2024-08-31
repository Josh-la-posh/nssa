import { Navigate, useNavigate } from 'react-router-dom';

import { ReactComponent as WelcomeBackIcon } from '@/assets/icons/welcome-back.svg';
import Design from '@/assets/images/onboarding/img-2.svg';
import { OnboardingLayout } from '@/components/Layout/OnboardingLayout';
import { useAuth } from '@/lib/auth';
import storage from '@/utils/storage';

import { LoginForm } from '../components';

export const Login = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const redirectRoute = storage.session.getValue('redirect-path') || '/';

  const handleSubmit = () => {
    navigate(redirectRoute);
  };

  if (user && user?.emailConfirm) {
    return <Navigate to={redirectRoute} replace />;
  }

  if (user && !user?.emailConfirm) {
    storage.session.setValue('redirect-path', location);
    return <Navigate to="/auth/confirm-email" replace />;
  }

  return (
    <div>
      <OnboardingLayout text="" imgBg="onboarding__img" image={Design.toString()}>
        <div className="pl-[64px]">
          <div className="flex-col justify-center w-full items-start flex">
            <h2 className="text-[29px] font-600 capitalize text-[#4f4f4f] mb-[1rem] leading-[34.8px]">
              Sign In
            </h2>
            <p className="text-400-19 text-[#7F8187] mb-7 flex gap-2 items-center">
              Welcome Back! <WelcomeBackIcon />
            </p>

            <div className="w-full flex flex-col items-start mb-20">
              <LoginForm onSuccess={handleSubmit} />
            </div>
          </div>
        </div>
      </OnboardingLayout>
    </div>
  );
};
