import React, { FunctionComponent, useState } from "react";
import { RouteComponentProps } from "@reach/router";
import useFetch from "fetch-suspense";

import { Person as PersonModel, Quote as QuoteModel } from "data";
import { QuizCard } from "components";
import { QUOTES_URL } from "config";
import "./QuizPage.css";

type QuizPageViewProps = {
  quote: QuoteModel;
  persons?: PersonModel[];
  guesses?: string[];
  onAnswer?: (person: PersonModel) => void;
};

export const QuizPageView = ({
  quote,
  persons = [],
  guesses = [],
  onAnswer = () => {},
}: QuizPageViewProps) => {
  const onSelectPerson = (person: PersonModel) => {
    onAnswer(person);
  };

  return (
    <main className="QuizPage">
      <QuizCard
        quote={quote}
        persons={persons}
        guesses={guesses}
        onSelectPerson={onSelectPerson}
      />
    </main>
  );
};

export const QuizPage: FunctionComponent<RouteComponentProps> = () => {
  const {
    data: { persons, quotes },
  } = useFetch(QUOTES_URL) as {
    data: {
      quotes: QuoteModel[];
      persons: PersonModel[];
    };
  };

  const filteredQuotes = quotes.filter(quote => quote.author !== "Anonymous");
  const filteredPersons = persons.filter(person => person.id !== "Anonymous");
  const answerDuration = 1000;
  const [quote, setQuote] = useState(getRandomQuote());
  const [guesses, setGuesses] = useState<string[]>([]);

  function getRandomQuote() {
    return suffle(filteredQuotes)[0];
  }

  function onAnswer(person: PersonModel) {
    setGuesses([...guesses, person.id]);

    if (person.id === quote.author) {
      setTimeout(() => {
        setQuote(getRandomQuote());
        setGuesses([]);
      }, answerDuration);
    }
  }

  return QuizPageView({
    persons: filteredPersons,
    quote,
    guesses,
    onAnswer,
  });
};

function suffle(list: any[]) {
  const copy = [...list];

  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy;
}
