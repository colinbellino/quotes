import { QuotesPage } from "components";
import { useQuotes } from "data";

const QuotesPageWrapper = () => {
  const { loading, error, quotes, persons } = useQuotes();

  return QuotesPage({ error, loading, quotes, persons });
};

export default QuotesPageWrapper;
