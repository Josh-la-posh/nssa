export function customDebounce<T extends (...args: any[]) => void>(func: T, delay: number) {
  let timerId: ReturnType<typeof setTimeout> | undefined;

  return function (...args: Parameters<T>) {
    if (timerId) {
      clearTimeout(timerId);
    }

    timerId = setTimeout(() => {
      func(...args);
    }, delay);
  };
}
