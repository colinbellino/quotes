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
  onSuccess?: () => void;
  onFail?: () => void;
};

export const QuizPageView = ({
  quote,
  persons = [],
  onSuccess = () => {},
  onFail = () => {},
}: QuizPageViewProps) => {
  const onSelectPerson = (person: PersonModel) => {
    if (person.id === quote.author) {
      onSuccess();
    } else {
      onFail();
    }
  };

  return (
    <main className="QuizPage">
      <QuizCard
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
  const onSuccess = () => {
    alert("🎉");
    setKey(Math.random());
  };
  const onFail = () => {
    alert("💔");
    setKey(Math.random());
  };

  return (
    <div key={key}>
      {QuizPageView({ persons, quote: randomQuote, onSuccess, onFail })}
    </div>
  );
};

function suffle(list: any[]) {
  const copy = [...list];

  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy;
}
