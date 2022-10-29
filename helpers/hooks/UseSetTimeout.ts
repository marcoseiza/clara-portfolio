import { useEffect } from "react";

export const useSetTimeout = (
  callback: () => void,
  timeout: number,
  dependencies: any[]
) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      callback();
    }, timeout);

    return () => {
      clearTimeout(timer);
    };
  }, dependencies);
};
