import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, text, color as colorKnob } from "@storybook/addon-knobs";

import { Avatar } from "components";
import { persons } from "data";

const stories = storiesOf("Atoms/Avatar", module);
stories.addDecorator(withKnobs);

stories.add("with knobs", () => {
  const bob = persons.find(data => data.id === "Bob");
  const color = colorKnob("Color", bob!.color);
  const alt = text("Alt", "Alternative text");

  return <Avatar url={bob!.avatar} color={color} alt={alt} />;
});
