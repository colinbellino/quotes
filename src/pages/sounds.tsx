import Head from "next/head";

import { SoundsPage } from "components";

const SoundsPageWrapper = () => (
  <>
    <Head>
      <title>Sons</title>
    </Head>
    {SoundsPage()}
  </>
);

export default SoundsPageWrapper;
