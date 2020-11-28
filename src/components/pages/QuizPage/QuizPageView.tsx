import React from "react";

import { PersonModel, QuoteModel } from "data";
import { MainLayout, QuizCard } from "components";
import styles from "./QuizPage.module.css";

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
    <MainLayout loading={quote === undefined}>
      <div className={styles.QuizPage}>
        <QuizCard
          quote={quote}
          persons={choices}
          guesses={guesses}
          onSelectPerson={onSelectPerson}
        />
      </div>
    </MainLayout>
  );
};
