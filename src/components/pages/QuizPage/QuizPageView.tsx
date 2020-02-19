import React from "react";

import { Person as PersonModel, Quote as QuoteModel } from "data";
import { QuizCard } from "components";
import "./QuizPage.css";

type QuizPageViewProps = {
  quote: QuoteModel;
  choices?: PersonModel[];
  onAnswer?: (person: PersonModel) => void;
};

export const QuizPageView = ({
  quote,
  choices = [],
  onAnswer = () => {},
}: QuizPageViewProps) => {
  const onSelectPerson = (person: PersonModel) => onAnswer(person);

  return (
    <main className="QuizPage">
      <QuizCard
        quote={quote}
        persons={choices}
        onSelectPerson={onSelectPerson}
      />
    </main>
  );
};
