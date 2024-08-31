import { Navigate, useNavigate } from 'react-router-dom';

import Design from '@/assets/images/onboarding/img-2.svg';
// import Logo from '@/assets/images/onboarding/logo-white.svg';
import { Logo } from '@/components/Elements';
import { OnboardingLayout } from '@/components/Layout/OnboardingLayout';
import { useAuth } from '@/lib/auth';

import { SignUpForm } from '../components';

export const SignUp = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleSubmit = () => {
    navigate('/auth/confirm-email', { state: { resend: false } });
  };

  if (user && user?.emailConfirm) {
    return <Navigate to="/" replace />;
  }

  if (user && !user?.emailConfirm) {
    return <Navigate to="/auth/confirm-email" replace />;
  }

  return (
    <div>
      <OnboardingLayout text="Welcome back!" imgBg="onboarding__img" image={Design.toString()}>
        <div className="pl-[64px]">
          <div className="flex-col justify-center w-full items-start flex">
            <div className="flex items-center gap-[6px] mb-1">
              <h2 className="text-black text-[24px] font-bold">Welcome to</h2>
              <Logo variant="black-text" className="w-[116.1px] h-[24px] mt-[6px]" />
            </div>
            <p className="text-[#666666] text-[16px]">
              Let’s get you started. Create an account to begin
            </p>

            <SignUpForm onSuccess={handleSubmit} />
          </div>
        </div>
      </OnboardingLayout>
    </div>
  );
};
