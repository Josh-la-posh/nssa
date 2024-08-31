import { useEffect, useState } from 'react';

type NumberCountProps = {
  value: number;
  duration?: number;
};

export const NumberCount = ({ value = 0, duration = 3000 }: NumberCountProps) => {
  const [currentNumber, setCurrentNumber] = useState(0);

  useEffect(() => {
    const handleInterval = setInterval(function () {
      if (currentNumber >= value) {
        setCurrentNumber(value);
      } else {
        setCurrentNumber((prev) => prev + 1);
      }
    }, duration / value);
    return () => {
      clearInterval(handleInterval);
    };
  }, [value, currentNumber, duration]);

  return <span>{currentNumber}</span>;
};
