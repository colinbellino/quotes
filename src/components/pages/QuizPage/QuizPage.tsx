import { FunctionComponent, useReducer } from "react";
import { RouteComponentProps } from "@reach/router";
import useFetch from "fetch-suspense";
import { take, propEq, reject } from "ramda";

import { Person as PersonModel, Quote as QuoteModel } from "data";
import { QUOTES_URL } from "config";
import { shuffle } from "shuffle";
import { QuizPageView } from "components";

type FetchResult = {
  data: {
    quotes: QuoteModel[];
    persons: PersonModel[];
  };
};

export const QuizPage: FunctionComponent<RouteComponentProps> = () => {
  const {
    data: { persons: allPersons, quotes: allQuotes },
  } = useFetch(QUOTES_URL) as FetchResult;
  const persons = reject(isPerson("Anonymous"), allPersons);
  const quotes = reject(isAuthor("Anonymous"), allQuotes);
  const [state, dispatch] = useReducer(reducer, getInitialState());

  const answerDuration = 1000;

  function getInitialState(): State {
    const quote = shuffle(quotes)[0];
    const validAnswer = persons.find(isPerson(quote.author))!;
    const choices: PersonModel[] = [
      validAnswer,
      ...getInvalidChoices(quote.author, 2),
    ];

    return { quote, choices };
  }

  function getInvalidChoices(author: string, count: number) {
    const invalidAnswers = shuffle(reject(isPerson(author))(persons));
    return take(count, invalidAnswers);
  }

  function isValidChoice(person: PersonModel) {
    return state.quote.author === person.id;
  }

  function onAnswer(guess: PersonModel) {
    console.log(`FIXME: Do something ${state.quote.author} --> ${guess.id}`);

    if (isValidChoice(guess)) {
      console.log("yay");
    } else {
      console.log("nay");
    }
    // setGuesses([...choices, person.id]);

    // if (person.id === quote.author) {
    //   setTimeout(() => {
    //     const randomQuote = shuffledQuotes[0];
    //     const randomAnswers = [
    //       shuffle(persons.find(person => person.id === randomQuote.author)),
    //     ];
    //     setAnswers(answers);
    //     setQuote(randomQuote);
    //     setGuesses([]);
    //   }, answerDuration);
    // }
  }

  return QuizPageView({
    quote: state.quote,
    choices: state.choices,
    onAnswer,
  });
};

type State = {
  quote: QuoteModel;
  choices: PersonModel[];
};

function reducer(state: State): State {
  return state;
}

const isPerson = propEq("id");
const isAuthor = propEq("author");
