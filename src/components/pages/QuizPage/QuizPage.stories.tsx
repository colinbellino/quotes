import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, object } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

import { QuizPageView } from "components";
import { quotes as quotesData, persons as personsData } from "data";

const stories = storiesOf("Pages/Quiz", module);
stories.addDecorator(withKnobs);

stories.add("with knobs", () => {
  const quote = object("Quote", quotesData[0]);
  const choices = object("Choices", personsData);
  const onAnswer = action("onAnswer");

  return <QuizPageView quote={quote} choices={choices} onAnswer={onAnswer} />;
});
