import React, { FunctionComponent } from "react";

import { useFetch } from "../useFetch";

type Quote = {
  id: string;
  text: string;
  date: string;
  author: string;
};

const useQuotes = () => {
  const [loading, quotes] = useFetch<Quote[]>("/hello");
  return { loading, quotes };
};

export const Quotes: FunctionComponent = () => {
  const { loading, quotes } = useQuotes();

  if (loading) {
    return null;
  }

  if (!quotes) {
    return null;
  }

  return (
    <ul>
      {quotes.map(quote => (
        <li key={quote.id}>
          <div>{quote.text}</div>
          <div>{quote.date}</div>
        </li>
      ))}
    </ul>
  );
};
