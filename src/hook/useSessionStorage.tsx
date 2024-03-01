import type { SetStateAction } from 'react';
import { useState } from 'react';

function useSessionStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.sessionStorage.getItem(key);
      if (item !== null) return JSON.parse(item) as T;
      return initialValue;
    } catch (error) {
      console.error(
        'Error retrieving data from sessionStorage:',
        error
      );
      return initialValue;
    }
  });
  /*
   * Return a wrapped version of useState's setter function that
   * persists the updated value in sessionStorage
   */
  const setValue = (value: SetStateAction<T>) => {
    try {
      const newValue =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(newValue);
      window.sessionStorage.setItem(key, JSON.stringify(newValue));
    } catch (error) {
      console.error('Error saving data to sessionStorage:', error);
    }
  };
  return [storedValue, setValue] as const;
}

export default useSessionStorage;
