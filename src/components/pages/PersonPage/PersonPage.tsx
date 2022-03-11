import React from "react";

import { PersonModel, QuoteModel, ReactionModel } from "data";
import { MainLayout, Avatar, Quote } from "components";
import styles from "./PersonPage.module.css";

export type PersonPageProps = {
  loading?: boolean;
  error?: string;
  person?: PersonModel;
  quotes: QuoteModel[];
  reactions: ReactionModel[];
};

export const PersonPage = ({
  loading = true,
  error,
  person,
  reactions,
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
              width={48}
            />
            <div className={styles.Info}>
              <h2 style={{ color: person.color }}>{person.id}</h2>
              <h3>{`${quotes.length} quote${quotes.length > 1 ? "s" : ""}`}</h3>
            </div>
          </header>
          <ul>
            {quotes.map((quote) => (
              <li key={quote.id}>
                <Quote quote={quote} reactions={reactions.filter(reaction => reaction.quoteId == quote.id)} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  </MainLayout>
);
