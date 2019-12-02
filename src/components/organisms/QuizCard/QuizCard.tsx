import React, { FunctionComponent } from "react";

import { Person as PersonModel, Quote as QuoteModel } from "data";
import { Quote, Avatar } from "components";
import { Tooltip } from "./Tooltip";
import "./QuizCard.css";

type QuizCardProps = {
  quote: QuoteModel;
  persons: PersonModel[];
  status?: string;
  onSelectPerson?: (person: PersonModel) => void;
};

export const QuizCard: FunctionComponent<QuizCardProps> = ({
  quote,
  persons,
  status,
  onSelectPerson = () => {},
}) => (
  <section className="QuizCard">
    <h1>Who said that ? {status && <span>{status}</span>}</h1>
    <Quote quote={quote} interactive={false} />
    <ul>
      {persons.map(person => (
        <li key={person.id} onClick={() => onSelectPerson(person)}>
          <Tooltip content={person.id}>
            <Avatar url={person.avatar} color={person.color} alt={person.id} />
          </Tooltip>
        </li>
      ))}
    </ul>
  </section>
);
