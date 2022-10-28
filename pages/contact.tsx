import type { GetServerSideProps, NextPage } from "next";
import { ErrorProps, isError } from "../helpers";
import Error from "../components/Error";
import { PropsWithPage } from "./_app";

interface ServerSideProps {}

const Contact: NextPage<PropsWithPage<ServerSideProps>> = (
  props: PropsWithPage<ServerSideProps> | ErrorProps
) => {
  if (isError(props))
    return <Error code={props.error.code} title={props.error.message} />;

  return <div></div>;
};

export const getServerSideProps: GetServerSideProps<
  ServerSideProps | ErrorProps
> = async () => {
  return { props: {} };
};

export default Contact;
