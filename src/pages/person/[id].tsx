import { GetServerSideProps } from "next";

import { QUOTES_URL } from "config";
import { PersonPage } from "components";
import { Person as PersonModel, Quote as QuoteModel } from "data";

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const res = await fetch(QUOTES_URL);
  const {
    data: { persons, quotes },
  }: {
    data: { persons: PersonModel[]; quotes: QuoteModel[] };
  } = await res.json();

  const person = persons.find((data) => data.id === query.id);
  const filteredQuotes = quotes.filter((quote) => quote.author === query.id);

  return { props: { person, quotes: filteredQuotes } };
};

export default PersonPage;
