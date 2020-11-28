import React from "react";

import { Person as PersonModel, Quote as QuoteModel } from "data";
import { MainLayout, Avatar, Quote } from "components";
import styles from "./PersonPage.module.css";

export type PersonPageProps = {
  person: PersonModel;
  quotes: QuoteModel[];
};

export const PersonPage = ({ person, quotes = [] }: PersonPageProps) => (
  <MainLayout loading={person === undefined}>
    <div className={styles.PersonPage}>
      <section className={styles.PersonCard}>
        <header>
          <Avatar
            color={person.color}
            url={person.avatar}
            alt={`${person.id}'s avatar`}
          />
          <div className={styles.Info}>
            <h2>{person.id}</h2>
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
    </div>
  </MainLayout>
);
