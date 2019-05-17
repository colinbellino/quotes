import React, { FunctionComponent } from "react";
import { RouteComponentProps } from "@reach/router";

import { persons, Person } from "data";
import { Avatar } from "components";
import "./PersonPage.css";

type EnhancedPerson = Person & { id: string };

type PersonPageViewProps = {
  person: EnhancedPerson;
};

export const PersonPageView = ({ person }: PersonPageViewProps) => (
  <main className="PersonPage">
    <Avatar
      color={person.color}
      url={person.avatar}
      alt={`${person.id}'s avatar`}
    />
  </main>
);

export const PersonPage: FunctionComponent<
  RouteComponentProps<{ id: string }>
> = ({ id }) => {
  const person = persons.find(data => data.id === id);

  if (!person) {
    return <div>Nope</div>;
  }

  return PersonPageView({ person });
};
