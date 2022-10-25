import { PropsWithChildren } from "react";

export interface MaybeBodyProps {
  className?: string;
}

const MaybeBody = ({
  children,
  className,
}: PropsWithChildren<MaybeBodyProps>) => {
  if (!children) return <></>;

  return <article className={`prose ${className}`}>{children}</article>;
};

export default MaybeBody;
