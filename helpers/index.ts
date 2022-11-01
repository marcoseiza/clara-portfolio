export const parseCssValue = (v: string | number) =>
  typeof v == "number" ? `${v}px` : v;

export const maxCSS = (a: string | number, b: string | number): string => {
  return `max(${parseCssValue(a)}, ${parseCssValue(b)})`;
};

export const minCss = (a: string | number, b: string | number): string => {
  return `min(${parseCssValue(a)}, ${parseCssValue(b)})`;
};

export type ErrorProps = { error: { code: number; message: string } };

export const isError = <T>(error: ErrorProps | T): error is ErrorProps => {
  return (error as ErrorProps).error !== undefined;
};

export const makeError = (code: number, message: string) => ({
  error: { code, message },
});
