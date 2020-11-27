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
  error?: string;
};

export const QuotesPageView = ({
  persons = [],
  quotes = [],
  error,
}: QuotesPageViewProps) => (
  <MainLayout>
    <main>
      {error ? (
        <div style={{ padding: "1em" }}>
          <div>Failed to load quotes :(</div>
          <pre style={{ whiteSpace: "break-spaces" }}>{error}</pre>
        </div>
      ) : (
        <ul className="QuotesPage">
          {quotes.map((quote) => {
            const person = persons.find((data) => data.id === quote.author);

            return (
              <li key={quote.id}>
                <Quote quote={quote} person={person!} />
              </li>
            );
          })}
        </ul>
      )}
    </main>
  </MainLayout>
);

export const QuotesPage: FunctionComponent<RouteComponentProps> = () => {
  const { data, error } = useFetch(QUOTES_URL) as {
    data: {
      quotes: QuoteModel[];
      persons: PersonModel[];
    };
    error: string;
  };

  return QuotesPageView({ error, ...data });
};
