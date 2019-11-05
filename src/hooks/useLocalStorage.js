import { useState } from "react";

//custom hook
export function useLocalStorage(key, initiaValue) {
  //inicializa el estado
  const [storageValue, setValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item !== null ? JSON.parse(item) : initiaValue;
    } catch (err) {
      return initiaValue;
    }
  });

  const setLocalStorage = value => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
      setValue(value);
    } catch (errores) {
      console.error(errores);
    }
  };

  //este hook devuelve un array , el primer valor nos
  //indica si debemos mostrar o no el elemento porque esta en el viewport
  // y el segundo valor es la referencia de este elemnto.
  return [storageValue, setLocalStorage];
}
