import React, { useRef, useEffect, useState } from 'react';

export function useIntersectionObserver<RefType>(): [
  ref: React.LegacyRef<RefType>,
  visible: boolean
] {
  const ref = useRef<RefType>(null);

  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      // In your case there's only one element to observe:
      entries.forEach((entry) => {
        entry.isIntersecting && setVisible(true);

        // No need to keep observing:
        observer.unobserve(ref.current as Element);
      });
    });

    observer.observe(ref.current as Element);

    return () => observer.disconnect();
  }, []);

  return [ref, isVisible];
}
