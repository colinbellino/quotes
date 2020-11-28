import { FunctionComponent, useReducer } from "react";
import take from "ramda/src/take";
import propEq from "ramda/src/propEq";
import reject from "ramda/src/reject";

import { Person as PersonModel, Quote as QuoteModel } from "data";
import { QuizPageView } from "components";
import { shuffle } from "shuffle";

type QuizPageProps = {
  quotes: QuoteModel[];
  persons: PersonModel[];
};

export const QuizPage: FunctionComponent<QuizPageProps> = ({
  persons: allPersons,
  quotes: allQuotes,
}) => {
  const persons = reject(isPerson("Anonymous"), allPersons);
  const quotes = reject(isAuthor("Anonymous"), allQuotes);
  const [{ quote, choices, guesses }, dispatch] = useReducer(
    reducer,
    getInitialState(),
  );

  function getInitialState(): State {
    const quote = shuffle(quotes)[0];
    const validAnswer = persons.find(isPerson(quote.author))!;
    const choices: PersonModel[] = shuffle([
      validAnswer,
      ...getInvalidChoices(quote.author, 2),
    ]);
    const guesses: string[] = [];

    return { quote, choices, guesses };
  }

  function getInvalidChoices(author: string, count: number) {
    const invalidAnswers = shuffle(reject(isPerson(author))(persons));
    return take(count, invalidAnswers);
  }

  function isValidChoice(person: PersonModel) {
    return quote.author === person.id;
  }

  function onAnswer(guess: PersonModel) {
    if (isValidChoice(guess)) {
      dispatch({ type: "SELECT_GUESS", guess: guess.id });
      const delayInMilliseconds = 1000;
      setTimeout(nextQuote, delayInMilliseconds);
      return;
    }

    if (guesses.includes(guess.id) === false) {
      dispatch({ type: "SELECT_GUESS", guess: guess.id });
    }
  }

  function nextQuote() {
    dispatch({ type: "RESET", state: getInitialState() });
  }

  return QuizPageView({ quote, choices, onAnswer, guesses });
};

type State = {
  quote: QuoteModel;
  choices: PersonModel[];
  guesses: string[];
};

type Dispatch =
  | {
      type: "SELECT_GUESS";
      guess: string;
    }
  | { type: "RESET"; state: State };

function reducer(state: State, action: Dispatch): State {
  switch (action.type) {
    case "SELECT_GUESS":
      return { ...state, guesses: [...state.guesses, action.guess] };
    case "RESET":
      return { ...action.state };
    default:
      return state;
  }
}

const isPerson = propEq("id");
const isAuthor = propEq("author");
