import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, object } from "@storybook/addon-knobs";

import { QuizPage } from "components";
import { quotes as quotesData, persons as personsData } from "data";

const stories = storiesOf("Pages/Quiz", module);
stories.addDecorator(withKnobs);

stories.add("with knobs", () => {
  const quotes = object("Quotes", quotesData);
  const persons = object("Persons", personsData);

  return <QuizPage quotes={quotes} persons={persons} loading={false} />;
});
