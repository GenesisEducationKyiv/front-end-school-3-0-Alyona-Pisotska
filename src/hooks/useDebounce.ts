import { useEffect, useState } from '@/hooks/hooks';

const DEFAULT_DELAY = 250;

function useDebounce<T>(value: T, delay = DEFAULT_DELAY): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timerId = setTimeout(() => setDebouncedValue(value), delay);

    return () => clearTimeout(timerId);
  }, [value, delay]);

  return debouncedValue;
}

export { useDebounce };
