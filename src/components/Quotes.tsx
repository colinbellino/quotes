import React, { FunctionComponent } from "react";

import { useFetch } from "../useFetch";
import "./Quotes.css";

type Quote = {
  id: string;
  text: string;
  date: string;
  author: string;
};

const sortByDate = (a: Quote, b: Quote): number =>
  new Date(b.date).getTime() - new Date(a.date).getTime();

export const Quotes: FunctionComponent = () => {
  const [loading, quotes] = useFetch<Quote[]>("/quotes");

  if (loading) {
    return null;
  }

  if (!quotes) {
    return null;
  }

  return (
    <ul className="Quotes">
      {quotes.sort(sortByDate).map(quote => {
        const date = new Intl.DateTimeFormat("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }).format(new Date(quote.date));

        return (
          <li key={quote.id} className="Quote">
            <>
              <blockquote>{quote.text}</blockquote>
              <cite>{`${quote.author} • ${date}`}</cite>
            </>
          </li>
        );
      })}
    </ul>
  );
};
