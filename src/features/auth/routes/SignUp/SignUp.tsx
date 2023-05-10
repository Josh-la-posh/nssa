import Design from '@/assets/images/onboarding/img-2.svg';
import Logo from '@/assets/images/onboarding/logo-white.svg';
import { OnboardingLayout } from '@/components/Layout/OnboardingLayout';
import { SignUpFormLayout } from '@/components/Form/SignupForm';

export const SignUp = () => {
  return (
    <div>
      <OnboardingLayout text="Welcome back!" imgBg="onboarding__img" image={Design} logo={Logo}>
        <div className="signing__page">
          <div className="signing__page__content">
            <h2 className="sec-heading">Welcome to</h2>
            <p className="text-400-16" style={{ color: '#666666' }}>
              Let’s get you started. Create an account to begin
            </p>

            <SignUpFormLayout style={{ marginTop: '40px' }} />
          </div>
        </div>
      </OnboardingLayout>
    </div>
  );
};
