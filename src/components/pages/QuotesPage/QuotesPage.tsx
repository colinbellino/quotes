import React, { FunctionComponent } from "react";
import { RouteComponentProps } from "@reach/router";
import useFetch from "fetch-suspense";

import { persons, Quote as QuoteModel } from "data";
import { MainLayout, Quote } from "components";
import "./QuotesPage.css";

const suffix = window.location.hostname === "localhost" ? "-dev" : "";

type QuotesPageViewProps = {
  quotes?: QuoteModel[];
};

export const QuotesPageView = ({ quotes = [] }: QuotesPageViewProps) => (
  <MainLayout>
    <main>
      <ul className="QuotesPage">
        {quotes.map(quote => {
          const person = persons.find(data => data.id === quote.author);
          return <Quote key={quote.id} quote={quote} person={person!} />;
        })}
      </ul>
    </main>
  </MainLayout>
);

export const QuotesPage: FunctionComponent<RouteComponentProps> = () => {
  const { data: quotes } = useFetch("/.netlify/functions/quotes" + suffix) as {
    data: QuoteModel[];
  };

  return QuotesPageView({ quotes: quotes });
};
