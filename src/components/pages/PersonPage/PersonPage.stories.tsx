import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, object } from "@storybook/addon-knobs";

import { PersonPageView } from "components";
import { persons, quotes } from "data";

const stories = storiesOf("Pages/Person", module);
stories.addDecorator(withKnobs);

stories.add("with knobs", () => {
  const bob = persons.find(data => data.id === "Bob");
  const filteredQuotes = quotes.filter(data => data.author === "Bob");
  const person = object("Person", bob);

  return <PersonPageView person={person!} quotes={filteredQuotes} />;
});
