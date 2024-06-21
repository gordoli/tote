import { useEffect, useCallback } from 'react';

import { Category } from "@/app/lib/types";

export const useDebounce = (
    effect: () => void,
    dependencies: [Category[], string],
    delay: number,
) => {
  const callback = useCallback(effect, dependencies);

  useEffect(() => {
    const timeout = setTimeout(callback, delay);
    return () => clearTimeout(timeout);
  }, [callback, delay]);
}
