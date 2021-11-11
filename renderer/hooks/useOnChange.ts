import { ChangeEvent, useState } from "react";

export default function useOnChange<T>(): [T, (e: ChangeEvent<any>) => void] {
  const [value, setValue] = useState<T>(null);

  function handleOnChange(e: ChangeEvent<any>): void {
    const result = e.target.value;
    setValue(result);
  }

  return [value, handleOnChange];
}
