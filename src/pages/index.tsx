import { QuotesPage } from "components";
import { useQuotes } from "data";

const QuotesPageWrapper = () => {
  const { loading, error, quotes, persons, reactions } = useQuotes();

  return QuotesPage({ error, loading, quotes, persons, reactions });
};

export default QuotesPageWrapper;
