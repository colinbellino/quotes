import React, { FunctionComponent } from "react";
import { RouteComponentProps } from "@reach/router";
import useFetch from "fetch-suspense";

import { persons, Quote as QuoteModel } from "data";
import { MainLayout, Quote } from "components";
import { QUOTES_URL } from "config";
import "./QuotesPage.css";

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
  const { data: quotes } = useFetch(QUOTES_URL) as {
    data: QuoteModel[];
  };

  return QuotesPageView({ quotes: quotes });
};
