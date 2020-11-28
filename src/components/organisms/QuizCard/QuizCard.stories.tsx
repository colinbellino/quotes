import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, object } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

import { QuizCard } from "components";
import { quotes as quotesData, persons as personsData } from "data";

const stories = storiesOf("Organisms/QuizCard", module);
stories.addDecorator(withKnobs);

stories.add("with knobs", () => {
  const quote = object("Quote", quotesData[0]);
  const persons = object("Persons", personsData);
  const guesses = object("Guesses", ["Bob", "Colin", "Julie"]);
  const onSelectPerson = action("onSelectPerson");

  return (
    <QuizCard
      quote={quote}
      persons={persons}
      guesses={guesses}
      onSelectPerson={onSelectPerson}
    />
  );
});
