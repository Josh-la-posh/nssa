import { ReactNode } from 'react';

import { Logo } from '../Logo';

export const LogoLoader = ({ text }: { text?: ReactNode }) => {
  return (
    <div role="status" className="max-w-screen  inset-0 h-screen overflow-hidden">
      <div className="flex h-full flex-col items-center justify-center text-center">
        <Logo variant="primary" className="mb-1 animate-bounce" />
        {text || <p className="animate-pulse text-base font-medium tracking-wide">Oponeko</p>}
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};
