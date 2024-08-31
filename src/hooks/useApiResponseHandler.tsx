import { useEffect } from 'react';

type useApiResponseHandlerProp = {
  runFn: boolean;
  fn: () => void;
};
export const useApiResponseHandler = ({ runFn, fn }: useApiResponseHandlerProp) => {
  useEffect(() => {
    if (runFn) {
      fn();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [runFn]);
};
