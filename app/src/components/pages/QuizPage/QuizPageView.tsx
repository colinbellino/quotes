import React from "react";

import { Person as PersonModel, Quote as QuoteModel } from "data";
import { QuizCard } from "components";
import "./QuizPage.css";

type QuizPageViewProps = {
  quote: QuoteModel;
  choices?: PersonModel[];
  guesses?: string[];
  onAnswer?: (person: PersonModel) => void;
};

export const QuizPageView = ({
  quote,
  choices = [],
  guesses = [],
  onAnswer = () => {},
}: QuizPageViewProps) => {
  const onSelectPerson = (person: PersonModel) => onAnswer(person);

  return (
    <main className="QuizPage">
      <QuizCard
        quote={quote}
        persons={choices}
        guesses={guesses}
        onSelectPerson={onSelectPerson}
      />
    </main>
  );
};
