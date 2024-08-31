import { useEffect, useState, useMemo, useCallback } from 'react';

type TimeValueType = {
  minutes: number;
  seconds: number;
  hours: number;
};

function toHoursAndMinutes(totalSeconds: number) {
  const totalMinutes = Math.floor(totalSeconds / 60);

  const seconds = totalSeconds % 60;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return { h: hours, m: minutes, s: seconds };
}
/**
 * Returns a timer value, and a function to reset the timer.
 *
 */
export const useCountdown = (
  defaultValue?: number
): [value: TimeValueType, reset: () => void, isComplete: boolean] => {
  const initialValue = defaultValue || 30;

  const { h, m, s } = useMemo(() => toHoursAndMinutes(initialValue), [initialValue]);

  const [hours, setHours] = useState(h);
  const [minutes, setMinutes] = useState(m);
  const [seconds, setSeconds] = useState(s);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          if (hours === 0) {
            clearInterval(interval);
          } else {
            setSeconds(59);
            setMinutes(59);
            setHours(hours - 1);
          }
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [hours, minutes, seconds]);

  const resetTimer = useCallback(() => {
    const { h, m, s } = toHoursAndMinutes(initialValue);

    setHours(h);
    setMinutes(m);
    setSeconds(s);
  }, [initialValue]);

  const countdownComplete = hours === 0 && minutes === 0 && seconds === 0;

  return [{ seconds, minutes, hours }, resetTimer, countdownComplete];
};
