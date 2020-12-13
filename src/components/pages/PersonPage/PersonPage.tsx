import React from "react";

import { PersonModel, QuoteModel } from "data";
import { MainLayout, Avatar, Quote } from "components";
import styles from "./PersonPage.module.css";

export type PersonPageProps = {
  loading?: boolean;
  error?: string;
  person?: PersonModel;
  quotes?: QuoteModel[];
};

export const PersonPage = ({
  loading = true,
  error,
  person,
  quotes = [],
}: PersonPageProps) => (
  <MainLayout loading={loading} error={error}>
    <div className={styles.PersonPage}>
      {person && (
        <section className={styles.PersonCard}>
          <header>
            <Avatar
              url={person.avatar}
              alt={`${person.id}'s avatar`}
              color={person.color}
            />
            <div className={styles.Info}>
              <h2 style={{ color: person.color }}>{person.id}</h2>
              <h3>{`${quotes.length} quote${quotes.length > 1 ? "s" : ""}`}</h3>
            </div>
          </header>
          <ul>
            {quotes.map((quote) => (
              <li key={quote.id}>
                <Quote quote={quote} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  </MainLayout>
);
