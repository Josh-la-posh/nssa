import { FC } from 'react';

import { Head } from '@/components/Head';
import { useScrollToPosition, useHeader } from '@/hooks';
import { useAuth } from '@/lib/auth';

type LayoutProps = {
  children?: React.ReactNode;
};

export const Layout: FC<LayoutProps> = ({ children }) => {
  const { user } = useAuth();

  useScrollToPosition();

  useHeader(
    <div className="p-2">
      <h2 className="text-base font-semibold">Welcome Back, {user?.firstName} 👋</h2>
    </div>
  );

  return (
    <>
      <Head title="Dashboard" />
      <div className="h-full overflow-auto">{children}</div>
    </>
  );
};
