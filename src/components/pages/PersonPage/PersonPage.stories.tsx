import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, object } from "@storybook/addon-knobs";

import { PersonPageView } from "components";
import { persons as personsData } from "data";

const stories = storiesOf("Pages/Person", module);
stories.addDecorator(withKnobs);

stories.add("with knobs", () => {
  const bob = personsData.find(data => data.id === "Bob");
  const person = object("Person", bob);

  return <PersonPageView person={person!} />;
});
