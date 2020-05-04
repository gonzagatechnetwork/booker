import { NextPage } from "next";
import Layout from "../../lib/Layout";

import { useRouter } from "next/router";

export const Page: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  // TODO show the office hours request
  // and let someone claim it here

  return (
    <Layout>
      <div>{id}</div>
    </Layout>
  );
};
