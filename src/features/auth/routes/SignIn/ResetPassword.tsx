import { ResetPasswordFormLayout } from '@/components/Form/SigninForm/SigninForm';
import { OnboardingLayout } from '@/components/Layout/OnboardingLayout';
import Design from '../../../../assets/images/onboarding/img-1.svg';
import Logo from '../../../../assets/images/onboarding/logo-blue.svg';

import TopLogo from '../../../../assets/images/onboarding/top-logo-2.png';

export const ResetPassword = () => {
  return (
    <div>
      <OnboardingLayout
        imgBg="onboarding__img2"
        text=''
        image={Design}
        logo={Logo}
        topLogo={TopLogo}
        style={{ marginTop: '68px' }}
      >
        <div className="signing__page">
          <div className="signing__page__content">
            <h2 className="pri-heading">Reset Password?</h2>
            <p className="text-500-12">
              Don't Worry, It Happens to the Best of Us! <br /> Let's get you back on track by
              resetting your password.
            </p>

            <ResetPasswordFormLayout to='' style={{ marginTop: '59px' }} />
          </div>
        </div>
      </OnboardingLayout>
    </div>
  );
};
