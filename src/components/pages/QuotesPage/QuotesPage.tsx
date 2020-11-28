import React from "react";

import { Person as PersonModel, Quote as QuoteModel } from "data";
import { MainLayout, Quote } from "components";
import styles from "./QuotesPage.module.css";

type QuotesPageProps = {
  quotes?: QuoteModel[];
  persons?: PersonModel[];
  error?: string;
};

export const QuotesPage = ({
  persons = [],
  quotes = [],
  error,
}: QuotesPageProps) => (
  <MainLayout>
    <main>
      {error ? (
        <div style={{ padding: "1em" }}>
          <div>Failed to load quotes :(</div>
          <pre style={{ whiteSpace: "break-spaces" }}>{error}</pre>
        </div>
      ) : (
        <ul className={styles.QuotesPage}>
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
