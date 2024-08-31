import clsx from 'clsx';
import * as React from 'react';

import BottomLogo from '@/assets/images/onboarding/bottom-logo.svg';
import TopLogo from '@/assets/images/onboarding/top-logo-1.png';
import { Image, Logo } from '@/components/Elements';

type OnboardingLayoutProps = {
  children: React.ReactNode;
  text: string;
  image: string;
  imgBg: any;
  topLogo?: string;
};

const imagePositions = {
  left: 'object-left-top',
  right: 'object-right-top',
  center: 'object-center-top',
};

export const OnboardingLayout = ({
  children,
  text,
  image,
  imgBg,
  topLogo,
}: OnboardingLayoutProps) => {
  return (
    <main className="flex min-h-screen w-full flex-col-reverse gap-0 md:flex-wrap lg:flex-row">
      <div className="flex-1 pt-[60px]">
        {children}
        <span className="opacity-50 lg:opacity-40 absolute bottom-[-20px] left-0">
          <img src={BottomLogo.toString()} alt="" />
        </span>
      </div>

      {/* RIGHT CONTAINER */}

      <div className={`h-48 lg:h-screen w-full lg:w-1/2 order-1 right-0 relative`}>
        <div className={clsx('fixed w-full lg:w-1/2 lg:p-0 p-10', imgBg)}>
          <div className="relative">
            <div className="lg:h-screen relative">
              <span className="absolute right-0 hidden lg:block">
                <img src={topLogo ? topLogo : TopLogo} alt="" />
              </span>

              <div className="mt-10 lg:mt-20 flex justify-center">
                <Logo variant="white-text" />
              </div>
              {text ? (
                <p
                  className={`text-400-19 mt-[20px] lg:mt-[27px] text-white hidden lg:block text-center`}
                >
                  {text}
                </p>
              ) : (
                <span></span>
              )}

              <Image
                alt={''}
                src={image}
                placeholderSrc={image}
                wrapperClassName="opacity-100 lg:fixed right-0 lg:bottom-0 lg:top-0 lg:w-1/2 w-full h-full"
                className={clsx(
                  'w-[80%] mt-[220px] object-cover opacity-100 mx-auto hidden lg:block',
                  imagePositions.center
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
