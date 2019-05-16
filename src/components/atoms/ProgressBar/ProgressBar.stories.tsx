import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, number, boolean } from "@storybook/addon-knobs";

import { ProgressBar } from "components";

const stories = storiesOf("Atoms/ProgressBar", module);
stories.addDecorator(withKnobs);

stories.add("with knobs", () => {
  const value = number("Value", 30, {
    range: true,
    min: 0,
    max: 100,
    step: 1,
  });
  const enabled = boolean("Enabled", true);

  return <ProgressBar value={value} enabled={enabled} />;
});
