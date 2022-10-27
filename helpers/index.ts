export const maxCSS = (a: string | number, b: string | number): string => {
  const aStr: string = typeof a == "number" ? `${a}px` : a;
  const bStr: string = typeof a == "number" ? `${a}px` : a;
  return `max(${aStr}, ${bStr})`;
};

export type ErrorProps = { error: { code: number; message: string } };

export const isError = <T>(error: ErrorProps | T): error is ErrorProps => {
  return (error as ErrorProps).error !== undefined;
};

export const makeError = (code: number, message: string) => ({
  error: { code, message },
});
