import { useRouter } from "next/router";

const Art = () => {
  const router = useRouter();
  const { slug } = router.query;

  return <p>Post: {slug}</p>;
};

export default Art;
