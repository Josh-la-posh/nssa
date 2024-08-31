import clsx from 'clsx';
import { ReactNode } from 'react';

import { useIntersectionObserver } from '@/hooks';

type SectionProps = {
  children: ReactNode;
  className?: string;
};

export const Section = ({ children, className }: SectionProps) => {
  const [domRef, isVisible] = useIntersectionObserver<HTMLElement>();

  return (
    <section
      ref={domRef}
      className={clsx(
        'transition-[opacity, transform] will-change-[opacity, visibility] translate-y-[10vh] opacity-0 duration-300 ease-out',
        isVisible ? 'visible block transform-none opacity-100' : 'opacity-0',
        className
      )}
    >
      {children}
    </section>
  );
};
