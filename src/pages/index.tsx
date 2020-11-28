import { GetServerSideProps } from "next";

import { QUOTES_URL } from "config";
import { QuotesPage } from "components";

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(QUOTES_URL);
  const { data } = await res.json();

  return { props: data };
};

export default QuotesPage;
