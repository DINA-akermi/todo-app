
import { useCallback } from "react";

export default function useLocalStorage(key) {
  const getStoredValue = useCallback((fallbackValue) => {
    try {
      const value = localStorage.getItem(key);
      return value === null ? fallbackValue : JSON.parse(value);
    } catch (error) {
      console.error("Erreur de lecture localStorage :", error);
      return fallbackValue;
    }
  }, [key]);

  const setStoredValue = useCallback((value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Erreur d'écriture localStorage :", error);
    }
  }, [key]);

  return [getStoredValue, setStoredValue];
}
