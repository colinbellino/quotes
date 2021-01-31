import useSWR, { mutate } from "swr";

import { QuoteModel, PersonModel, ReactionModel } from "data";
import { QUOTES_URL, ADD_REACTION_URL } from "config";

const fetcher = (...args: any[]) =>
  fetch(args[0], args[1])
  .then((res) => res.json());

const postFetcher = (body: any) => {
    return fetch(ADD_REACTION_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((res) => res.json())
}

type QuotesResult = {
  quotes: QuoteModel[];
  persons: PersonModel[];
  reactions: ReactionModel[];
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
    reactions: (data && data.data.reactions) || [],
  };
}

type AddReactionResult = {
  message: string;
  data: {
    reaction?: ReactionModel;
  };
};

export function useAddReaction(): (reaction: ReactionModel) => Promise<AddReactionResult> {
  return async (reaction) => {
    console.log(reaction);
    return mutate(ADD_REACTION_URL, postFetcher(reaction));
  }
}
