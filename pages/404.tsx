import Error from "../components/Error";

const Page404 = () => {
  return <Error code={404} title="Page Not Found." />;
};
(Page404 as any).noBaseLayout = true;
export default Page404;
