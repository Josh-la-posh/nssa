import Design from '@/assets/images/onboarding/img-2.svg';
import Logo from '@/assets/images/onboarding/logo-white.svg';
import { SignInFormLayout } from '@/components/Form/SigninForm/SigninForm';
import { OnboardingLayout } from '@/components/Layout/OnboardingLayout';

export const Login = () => {
  return (
    <div>
      <OnboardingLayout
        text="Welcome back!"
        imgBg="onboarding__img"
        image={Design}
        logo={Logo}
        style={{}}
        topLogo=""
      >
        <div className="signing__page">
          <div className="signing__page__content">
            <h2 className="pri-heading">Sign In</h2>
            <p className="text-400-19" style={{ color: '#7F8187' }}>
              Welcome back!
            </p>

            <SignInFormLayout to="" style={{ marginTop: '70px' }} />
          </div>
        </div>
      </OnboardingLayout>
    </div>
  );
};
