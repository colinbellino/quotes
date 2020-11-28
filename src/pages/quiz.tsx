import { GetServerSideProps } from "next";

import { QUOTES_URL } from "config";
import { QuizPage } from "components";
import { PersonModel, QuoteModel } from "data";

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(QUOTES_URL);
  const {
    data: { persons, quotes },
  }: {
    data: { persons: PersonModel[]; quotes: QuoteModel[] };
  } = await res.json();

  return { props: { persons, quotes } };
};

export default QuizPage;
