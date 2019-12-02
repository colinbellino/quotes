import React, { FunctionComponent, useState } from "react";
import { RouteComponentProps } from "@reach/router";
import useFetch from "fetch-suspense";

import { Person as PersonModel, Quote as QuoteModel } from "data";
import { QuizCard } from "components";
import { QUOTES_URL } from "config";
import "./QuizPage.css";

type QuizPageViewProps = {
  key: string;
  quote: QuoteModel;
  persons?: PersonModel[];
  onAnswer?: () => void;
};

export const QuizPageView = ({
  key,
  quote,
  persons = [],
  onAnswer = () => {},
}: QuizPageViewProps) => {
  const onSelectPerson = (person: PersonModel) => {
    if (person.id === quote.author) {
      alert("Yusss!");
    } else {
      alert("Nope!");
    }
    onAnswer();
  };

  return (
    <main className="QuizPage">
      <QuizCard
        key={key}
        quote={quote}
        persons={persons}
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
  const randomQuote = suffle(quotes)[0];

  const [key, setKey] = useState();
  const onAnswer = () => {
    setKey(Math.random());
  };

  return QuizPageView({ key, persons, quote: randomQuote, onAnswer });
};

function suffle(list: any[]) {
  const copy = [...list];

  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy;
}
