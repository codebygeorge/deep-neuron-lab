import { DependencyList, useEffect, useRef } from 'react';

const useDidUpdate = (callback: () => void, deps: DependencyList) => {
  const hasMount = useRef<boolean>(false);

  useEffect(() => {
    if (hasMount.current) {
      callback();
    } else {
      hasMount.current = true;
    }
  }, deps);
};

export default useDidUpdate;
