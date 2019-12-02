import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, object } from "@storybook/addon-knobs";

import { QuizCard } from "components";
import { quotes as quotesData, persons as personsData } from "data";

const stories = storiesOf("Organisms/QuizCard", module);
stories.addDecorator(withKnobs);

stories.add("with knobs", () => {
  const quote = object("Quote", quotesData[0]);
  const persons = object("Persons", personsData);

  return <QuizCard quote={quote} persons={persons} />;
});
