import { isError, ErrorProps } from ".";
import Error from "../components/Error";

const withError = <T,>(
  component: (p: T) => JSX.Element | null
): ((p: T | ErrorProps) => JSX.Element | null) => {
  return (p: T | ErrorProps) => {
    if (isError(p))
      return <Error code={p.error.code} title={p.error.message} />;
    return component(p);
  };
};

export default withError;
