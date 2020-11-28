import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, object } from "@storybook/addon-knobs";

import { Quote } from "components";
import { quotes, persons as personsData } from "data";

const stories = storiesOf("Molecules/Quote", module);
stories.addDecorator(withKnobs);

stories.add("with knobs", () => {
  const bob = personsData.find(data => data.id === "Bob");
  const quote = object("Quote", quotes[0]);
  const person = object("Person", bob);

  return <Quote quote={quote} person={person!} />;
});
