import React, { FunctionComponent } from "react";

import { Person as PersonModel, Quote as QuoteModel } from "data";
import { Quote, Avatar } from "components";
import "./QuizCard.css";

type QuizCardProps = {
  quote: QuoteModel;
  persons: PersonModel[];
};

export const QuizCard: FunctionComponent<QuizCardProps> = ({
  quote,
  persons,
}) => (
  <section className="QuizCard">
    <h1>Who said that ?</h1>
    <Quote quote={quote} />
    <ul>
      {persons.map(person => (
        <li key={person.id}>
          <Avatar url={person.avatar} color={person.color} alt={person.id} />
        </li>
      ))}
    </ul>
  </section>
);
