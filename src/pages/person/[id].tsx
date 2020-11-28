import { useRouter } from "next/router";

import { PersonPage } from "components";
import { useQuotes } from "data";

const PersonPageWrapper = () => {
  const { query } = useRouter();
  const { loading, error, quotes, persons } = useQuotes();

  const person = persons && persons.find((data) => data.id === query.id);
  const filteredQuotes = quotes!.filter((quote) => quote.author === query.id);

  return PersonPage({ loading, error, quotes: filteredQuotes, person });
};

export default PersonPageWrapper;
