import useSWR from "swr";

import { QUOTES_URL } from "config";
import { QuotesPage } from "components";

const fetcher = (...args: any[]) =>
  fetch(args[0], args[1]).then((res) => res.json());

const QuotesPageWrapper = () => {
  const { data, error } = useSWR<any>(QUOTES_URL, fetcher);

  const loading = data == undefined;
  const quotes: any = data?.data?.quotes || [];
  const persons: any = data?.data?.persons || [];

  return QuotesPage({ error, loading, quotes, persons });
};

export default QuotesPageWrapper;
