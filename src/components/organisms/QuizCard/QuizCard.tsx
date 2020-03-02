import React, { FunctionComponent } from "react";

import { Person as PersonModel, Quote as QuoteModel } from "data";
import { Quote, Avatar } from "components";
import "./QuizCard.css";

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
  <section className="QuizCard">
    <h1>Qui a dit ?</h1>
    <Quote quote={quote} interactive={false} />
    <ul>
      {persons.map(person => {
        const isGuess = guesses.includes(person.id);
        const isAnswer = person.id === quote.author;
        const resultClass = isGuess && (isAnswer ? "Success" : "Failure");

        return (
          <li key={person.id} onClick={() => onSelectPerson(person)}>
            <Avatar url={person.avatar} color={person.color} alt={person.id} />
            <div>{person.id}</div>
            <div className={`Result ${resultClass}`} />
          </li>
        );
      })}
    </ul>
  </section>
);
