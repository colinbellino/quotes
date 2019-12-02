import React, { FunctionComponent } from "react";
import { RouteComponentProps } from "@reach/router";
import useFetch from "fetch-suspense";

import { Person as PersonModel, Quote as QuoteModel } from "data";
import { QuizCard } from "components";
import { QUOTES_URL } from "config";
import "./QuizPage.css";

type QuizPageViewProps = {
  quote: QuoteModel;
  persons?: PersonModel[];
};

export const QuizPageView = ({ quote, persons = [] }: QuizPageViewProps) => {
  return (
    <main className="QuizPage">
      <QuizCard quote={quote} persons={persons} />
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

  return QuizPageView({ persons, quote: randomQuote });
};

function suffle(list: any[]) {
  const copy = [...list];

  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy;
}
