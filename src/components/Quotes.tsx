import React, { FunctionComponent } from "react";

import { peopleData } from "../peopleData";
import { useFetch } from "../useFetch";
import { Avatar } from "./Avatar";
import "./Quotes.css";

type Quote = {
  id: string;
  text: string;
  date: string;
  author: string;
};

const locale = "en-US";
const dateFormat = {
  year: "numeric",
  month: "long",
  day: "numeric",
};
const dateFormatter = new Intl.DateTimeFormat(locale, dateFormat);

const suffix = window.location.hostname === "localhost" ? "-dev" : "";

const getData = (author: string) => peopleData[author] || {};

export const Quotes: FunctionComponent = () => {
  const [loading, quotes] = useFetch<Quote[]>("/quotes" + suffix);

  if (loading) {
    return null;
  }

  if (!quotes) {
    return null;
  }

  return (
    <ul className="Quotes">
      {quotes.reverse().map(quote => {
        const date = dateFormatter.format(new Date(quote.date));
        const data = getData(quote.author);

        return (
          <li key={quote.id} className="Quote">
            <>
              <blockquote>{quote.text}</blockquote>
              <cite>
                <Avatar
                  color={data.color}
                  url={data.avatar}
                  alt={`${quote.author}'s avatar`}
                />
                {` ${quote.author} • ${date}`}
              </cite>
            </>
          </li>
        );
      })}
    </ul>
  );
};
