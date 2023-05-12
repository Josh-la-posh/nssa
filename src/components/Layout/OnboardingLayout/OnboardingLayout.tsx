import * as React from 'react';
import BottomLogo from '../../../assets/images/onboarding/bottom-logo.svg';
import TopLogo from '../../../assets/images/onboarding/top-logo-1.png';

type OnboardingLayoutProps = {
  children: React.ReactNode;
  text: string;
  image: string;
  logo: string;
  style: any;
  imgBg: any;
  topLogo: string;
};

export const OnboardingLayout = ({
  children,
  text,
  image,
  logo,
  style,
  imgBg,
  topLogo,
}: OnboardingLayoutProps) => {
  return (
    <main className="onboarding flex">
      <div className="onboarding__form flex-1">
        {children}{' '}
        <span className="logo">
          <img src={BottomLogo} />
        </span>
      </div>

      {/* RIGHT CONTAINER */}

      <div className={`${imgBg} flex-1`}>
        <div className="onboarding__img__container flex-column">
          <span className="logo">
            <img src={topLogo ? topLogo : TopLogo} />
          </span>
          <div className="flex j-center a-center">
            <img src={logo} />
          </div>
          {text ? <p className={`text-400-19`}>{text}</p> : <span></span>}
          <div className="image" style={style}>
            <img src={image} />
          </div>
        </div>
      </div>
    </main>
  );
};
