import { useEffect, useState } from "react";

// A custom hook for managing state in local storage
export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
  // Initializing state with a callback function that retrieves the value from local storage or uses the initial value
  const [value, setValue] = useState<T>(() => {
    const jsonValue = localStorage.getItem(key);
    if (jsonValue == null) {
      if (typeof initialValue === "function") {
        return (initialValue as () => T)(); // If initial value is a function, execute it to get the value
      } else {
        return initialValue; // Otherwise, use the provided initial value
      }
    } else {
      return JSON.parse(jsonValue); // Parse the stored JSON value
    }
  });

  // Using useEffect to update local storage whenever the value changes
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value)); // Store the value as JSON in local storage
  }, [value, key]);

  // Returning the current value and the setter function
  return [value, setValue] as [T, typeof setValue];
}
