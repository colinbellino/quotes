import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, text, color } from "@storybook/addon-knobs";

import { Avatar } from "components";

const stories = storiesOf("Atoms/Avatar", module);
stories.addDecorator(withKnobs);

stories.add("with knobs", () => {
  const url = text("URL", "https://api.adorable.io/avatars/285/pouet");
  const colorr = color("Color", "#F44336");
  const alt = text("Alt", "Alternative text");

  return <Avatar url={url} color={colorr} alt={alt} />;
});
