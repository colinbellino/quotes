import React, { FunctionComponent } from "react";

import { useFetch } from "../useFetch";
import "./Quotes.css";

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
    <ul className="Quotes">
      {quotes.map(quote => (
        <li key={quote.id} className="Quote">
          <>
            <blockquote>{quote.text}</blockquote>
            <cite>
              – {quote.author}, {quote.date}
            </cite>
          </>
        </li>
      ))}
    </ul>
  );
};
