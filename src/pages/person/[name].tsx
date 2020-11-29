import Head from "next/head";
import { useRouter } from "next/router";

import { PersonPage } from "components";
import { useQuotes } from "data";

const PersonPageWrapper = () => {
  const { query } = useRouter();
  const { loading, error, quotes, persons } = useQuotes();

  const person = persons && persons.find((data) => data.name === query.name);
  const filteredQuotes = quotes!.filter((quote) => quote.author === query.name);

  return (
    <>
      <Head>
        <title>{person && person.name}</title>
      </Head>
      {PersonPage({ loading, error, quotes: filteredQuotes, person })}
    </>
  );
};

export default PersonPageWrapper;
