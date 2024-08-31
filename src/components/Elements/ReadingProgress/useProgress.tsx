import { useCallback, useState, EffectCallback, useEffect, useRef } from 'react';

import { createQueue } from './createQueue';
import { createTimeout } from './createTimeout';

type Options = {
  animationDuration?: number;
  incrementDuration?: number;
  isAnimating?: boolean;
  minimum?: number;
};

const useEffectOnce = (effect: EffectCallback) => {
  //   eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(effect, []);
};

const useFirstMountState = (): boolean => {
  const isFirst = useRef(true);

  if (isFirst.current) {
    isFirst.current = false;
    return true;
  }

  return isFirst.current;
};

const useUpdateEffect: typeof useEffect = (effect, deps) => {
  const isFirstMount = useFirstMountState();

  useEffect(() => {
    if (!isFirstMount) {
      return effect();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};

const incrementParameter = (num: number): number => ++num % 1_000_000;

const useUpdate = () => {
  const [, setState] = useState(0);
  return useCallback(() => setState(incrementParameter), []);
};

const useGetSetState = <T extends object>(
  /* istanbul ignore next */
  initialState: T = {} as T
): [() => T, (patch: Partial<T>) => void] => {
  const update = useUpdate();
  const state = useRef<T>({ ...(initialState as object) } as T);
  const get = useCallback(() => state.current, []);
  const set = useCallback((patch: Partial<T>) => {
    if (!patch) {
      return;
    }
    Object.assign(state.current, patch);
    update();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [get, set];
};

const clamp = (num: number, lower: number, upper: number): number => {
  num = num <= upper ? num : upper;
  num = num >= lower ? num : lower;
  return num;
};

const increment = (progress: number): number => {
  let amount = 0;

  if (progress >= 0 && progress < 0.2) {
    amount = 0.1;
  } else if (progress >= 0.2 && progress < 0.5) {
    amount = 0.04;
  } else if (progress >= 0.5 && progress < 0.8) {
    amount = 0.02;
  } else if (progress >= 0.8 && progress < 0.99) {
    amount = 0.005;
  }

  return clamp(progress + amount, 0, 0.994);
};

/* istanbul ignore next */
const noop = () => undefined;

const initialState: {
  isFinished: boolean;
  progress: number;
  sideEffect: () => void;
} = {
  isFinished: true,
  progress: 0,
  sideEffect: noop,
};

export const useProgress = ({
  animationDuration = 200,
  incrementDuration = 800,
  isAnimating = false,
  minimum = 0.08,
}: Options = {}): {
  animationDuration: number;
  isFinished: boolean;
  progress: number;
} => {
  const [get, setState] = useGetSetState(initialState);

  const queue = useRef<ReturnType<typeof createQueue> | null>(null);
  const timeout = useRef<ReturnType<typeof createTimeout> | null>(null);

  useEffectOnce(() => {
    queue.current = createQueue();
    timeout.current = createTimeout();
  });

  const cleanup = useCallback(() => {
    timeout.current?.cancel();
    queue.current?.clear();
  }, []);

  const set = useCallback(
    (n: number) => {
      n = clamp(n, minimum, 1);

      if (n === 1) {
        cleanup();

        queue.current?.enqueue((next) => {
          setState({
            progress: n,
            sideEffect: () => timeout.current?.schedule(next, animationDuration),
          });
        });

        queue.current?.enqueue(() => {
          setState({ isFinished: true, sideEffect: cleanup });
        });

        return;
      }

      queue.current?.enqueue((next) => {
        setState({
          isFinished: false,
          progress: n,
          sideEffect: () => timeout.current?.schedule(next, animationDuration),
        });
      });
    },
    [animationDuration, cleanup, minimum, queue, setState, timeout]
  );

  const trickle = useCallback(() => {
    set(increment(get().progress));
  }, [get, set]);

  const start = useCallback(() => {
    const work = () => {
      trickle();
      queue.current?.enqueue((next) => {
        timeout.current?.schedule(() => {
          work();
          next();
        }, incrementDuration);
      });
    };

    work();
  }, [incrementDuration, queue, timeout, trickle]);

  const savedTrickle = useRef<() => void>(noop);

  const sideEffect = get().sideEffect;

  useEffect(() => {
    savedTrickle.current = trickle;
  });

  useEffectOnce(() => {
    if (isAnimating) {
      start();
    }
    return cleanup;
  });

  useUpdateEffect(() => {
    get().sideEffect();
  }, [get, sideEffect]);

  useUpdateEffect(() => {
    if (!isAnimating) {
      set(1);
    } else {
      setState({
        ...initialState,
        sideEffect: start,
      });
    }
  }, [isAnimating, set, setState, start]);

  return {
    animationDuration,
    isFinished: get().isFinished,
    progress: get().progress,
  };
};
