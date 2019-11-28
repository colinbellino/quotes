import React, { FunctionComponent } from "react";
import { RouteComponentProps } from "@reach/router";
import useFetch from "fetch-suspense";

import { Person as PersonModel, Quote as QuoteModel } from "data";
import { MainLayout, Quote } from "components";
import { QUOTES_URL } from "config";
import "./QuotesPage.css";

type QuotesPageViewProps = {
  quotes?: QuoteModel[];
  persons?: PersonModel[];
};

export const QuotesPageView = ({
  persons = [],
  quotes = [],
}: QuotesPageViewProps) => (
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
  const {
    data: { quotes, persons },
  } = useFetch(QUOTES_URL) as {
    data: {
      quotes: QuoteModel[];
      persons: PersonModel[];
    };
  };

  return QuotesPageView({ quotes, persons });
};
