import { ReactNode, useEffect } from 'react';

import { Head } from '@/components/Head';
import { useColorMode, useScrollToPosition } from '@/hooks';

type LayoutProps = {
  children?: ReactNode;
  title?: string;
  description?: string;
  animateCheckYourEmailSvg?: boolean;
};

export const Layout = ({ title, description, children }: LayoutProps) => {
  useScrollToPosition();
  const { setColor } = useColorMode();

  useEffect(() => {
    setColor('light');
  }, [setColor]);
  return (
    <>
      <Head title={title} description={description} />
      <div className="pt-6 md:px-10 px-5">{children}</div>
    </>
  );
};
