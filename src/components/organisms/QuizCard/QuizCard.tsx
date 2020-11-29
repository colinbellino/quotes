import React, { FunctionComponent } from "react";

import { PersonModel, QuoteModel } from "data";
import { Quote, Avatar } from "components";
import styles from "./QuizCard.module.css";

type QuizCardProps = {
  quote: QuoteModel;
  persons: PersonModel[];
  guesses?: string[];
  onSelectPerson?: (person: PersonModel) => void;
};

export const QuizCard: FunctionComponent<QuizCardProps> = ({
  quote,
  persons,
  guesses = [],
  onSelectPerson = () => {},
}) => (
  <section className={styles.QuizCard}>
    <h1>Qui a dit ?</h1>
    <Quote quote={quote} interactive={false} />
    <ul>
      {persons.map((person) => {
        const isGuess = guesses.includes(person.name);
        const isAnswer = person.name === quote.author;
        const resultClass = isGuess ? (isAnswer ? "Success" : "Failure") : "";

        return (
          <li key={person.id} onClick={() => onSelectPerson(person)}>
            <Avatar
              url={person.avatar}
              alt={person.name}
              color={person.color}
            />
            <div>{person.name}</div>
            <div className={`${styles.Result} ${resultClass}`} />
          </li>
        );
      })}
    </ul>
  </section>
);
