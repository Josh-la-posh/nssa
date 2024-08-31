import clsx from 'clsx';
import { ReactNode, useEffect } from 'react';

import { Logo } from '@/components/Elements';
import { Head } from '@/components/Head';
import { useColorMode, useScrollToPosition } from '@/hooks';

import { ReactComponent as CheckYourEmailSvg } from '../assets/illustrations/check-your-email.svg';

type LayoutProps = {
  children?: ReactNode;
  title?: string;
  description?: string;
  animateCheckYourEmailSvg?: boolean;
};

export const Layout = ({ title, description, children, animateCheckYourEmailSvg }: LayoutProps) => {
  useScrollToPosition();
  const { setColor } = useColorMode();

  useEffect(() => {
    setColor('light');
  }, [setColor]);
  return (
    <>
      <Head title={title} description={description} />
      <div className="pt-[94px] md:px-10 px-5">
        <div className="flex flex-col items-center">
          <Logo variant="primary-text" className="mb-[80px]" />
          <CheckYourEmailSvg
            className={clsx('mb-[41px]', animateCheckYourEmailSvg && 'animate-pulse')}
          />
          {children}
        </div>
      </div>
    </>
  );
};
