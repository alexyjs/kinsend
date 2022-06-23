import { useState } from "react";

export const storage = (key) => {
  const get = () => {
    const serializedValue = localStorage.getItem(key);
    if (!!serializedValue) {
      return JSON.parse(serializedValue);
    }

    return null;
  };
  const set = (value) => {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  };

  return { get, set };
};

const useLocalStorage = (key, initialValue) => {
  if (!key || typeof key !== "string" || key.length === 0) {
    throw new Error(
      "Make sure that you have provide a key as first argument. the key must be string and not empty."
    );
  }
  if (!initialValue) {
    initialValue = false;
  }

  const storageManager = storage(key);

  const [value, setValue] = useState(() => {
    const init =
      storageManager.get() ||
      (typeof initialValue === "function" ? initialValue() : initialValue);
    storageManager.set(init);
    return init;
  });

  const updateValue = (newValue) => {
    if (!newValue) {
      newValue = false;
    }
    if (typeof newValue === "function") {
      newValue = newValue(value);
    }

    storageManager.set(newValue);
    setValue(newValue);
  };

  return [value, updateValue];
};

export default useLocalStorage;
