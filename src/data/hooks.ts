import useSWR from "swr";

import { QuoteModel, PersonModel } from "data";
import { QUOTES_URL } from "config";

const fetcher = (...args: any[]) =>
  fetch(args[0], args[1]).then((res) => res.json());

type QuotesResult = {
  quotes?: QuoteModel[];
  persons?: PersonModel[];
};

export function useQuotes(): QuotesResult & {
  loading: boolean;
  error: string;
} {
  const { data, error } = useSWR<{ data: QuotesResult }>(QUOTES_URL, fetcher);

  return {
    loading: !error && !data,
    error: error,
    quotes: (data && data.data.quotes) || [],
    persons: (data && data.data.persons) || [],
  };
}
