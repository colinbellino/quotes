import React, { FunctionComponent } from "react";
import { RouteComponentProps } from "@reach/router";

import { persons, Quote } from "data";
import { useFetch } from "useFetch";
import { Avatar, MainLayout } from "components";
import "./QuotesPage.css";

const locale = "en-US";
const dateFormat = {
  year: "numeric",
  month: "long",
  day: "numeric",
};
const dateFormatter = new Intl.DateTimeFormat(locale, dateFormat);

const suffix = window.location.hostname === "localhost" ? "-dev" : "";

const getPersonData = (author: string) => persons[author] || {};

type QuotesPageViewProps = {
  quotes?: Quote[];
};

export const QuotesPageView = ({ quotes = [] }: QuotesPageViewProps) => (
  <MainLayout>
    <main>
      <ul className="QuotesPage">
        {quotes.map(quote => {
          const date = dateFormatter.format(new Date(quote.date));
          const person = getPersonData(quote.author);

          return (
            <li key={quote.id} className="Quote">
              <>
                <blockquote>{quote.text}</blockquote>
                <cite>
                  <Avatar
                    color={person.color}
                    url={person.avatar}
                    alt={`${quote.author}'s avatar`}
                  />
                  {` ${quote.author} • ${date}`}
                </cite>
              </>
            </li>
          );
        })}
      </ul>
    </main>
  </MainLayout>
);

export const QuotesPage: FunctionComponent<RouteComponentProps> = () => {
  const [loading, quotes] = useFetch<Quote[]>("/quotes" + suffix);

  if (loading) {
    return null;
  }

  if (!quotes) {
    return null;
  }

  return QuotesPageView({ quotes: quotes.reverse() });
};
