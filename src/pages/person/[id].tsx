import Head from "next/head";
import { useRouter } from "next/router";

import { PersonPage } from "components";
import { useQuotes } from "data";

const PersonPageWrapper = () => {
  const { query } = useRouter();
  const { loading, error, quotes, persons, reactions } = useQuotes();

  const person = persons.find((data) => data.id === query.id);
  const filteredQuotes = quotes!.filter((quote) => quote.author === query.id);
  const filteredReactions = reactions!.filter((reaction) => filteredQuotes.filter(quote => quote.id == reaction.quoteId).length > 0);

  return (
    <>
      <Head>
        <title>{person && person.id}</title>
      </Head>
      {PersonPage({ loading, error, quotes: filteredQuotes, person, reactions: filteredReactions })}
    </>
  );
};

export default PersonPageWrapper;
