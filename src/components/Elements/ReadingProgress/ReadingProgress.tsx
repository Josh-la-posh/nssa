import clsx from 'clsx';
import React from 'react';

import { useProgress } from './useProgress';

export const ReadingProgress: React.FC<{
  isAnimating: boolean;
  position: 'top' | 'bottom';
}> = ({ isAnimating, position }) => {
  const { animationDuration, isFinished, progress } = useProgress({
    isAnimating,
  });

  return (
    <div className={clsx('absolute w-full', position == 'top' ? 'top-0' : 'bottom-0')}>
      <Container animationDuration={animationDuration} isFinished={isFinished}>
        <Bar animationDuration={animationDuration} progress={progress} />
      </Container>
    </div>
  );
};

const Bar: React.FC<{
  animationDuration: number;
  progress: number;
}> = ({ animationDuration, progress }) => (
  <div
    style={{
      background: '#29d',
      height: 2,
      left: 0,
      marginLeft: `${(-1 + progress) * 100}%`,
      position: 'relative',
      top: 0,
      transition: `margin-left ${animationDuration}ms linear`,
      width: '100%',
      zIndex: 1031,
    }}
  />
);

const Container: React.FC<{
  animationDuration: number;
  isFinished: boolean;
  children: React.ReactNode;
}> = ({ animationDuration, children, isFinished }) => (
  <div
    style={{
      opacity: isFinished ? 0 : 1,
      pointerEvents: 'none',
      transition: `opacity ${animationDuration}ms linear`,
    }}
  >
    {children}
  </div>
);
