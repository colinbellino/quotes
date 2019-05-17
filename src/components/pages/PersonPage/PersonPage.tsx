import React, { FunctionComponent } from "react";
import { RouteComponentProps } from "@reach/router";

import { persons, Person, Quote } from "data";
import { Avatar } from "components";
import "./PersonPage.css";

type EnhancedPerson = Person & { id: string };

type PersonPageViewProps = {
  person: EnhancedPerson;
  quotes?: Quote[];
};

export const PersonPageView = ({
  person,
  quotes = [],
}: PersonPageViewProps) => (
  <main className="PersonPage">
    <div className="PersonCard">
      <Avatar
        color={person.color}
        url={person.avatar}
        alt={`${person.id}'s avatar`}
      />
      <h1>{person.id}</h1>
      {/* TODO: Get the correct number of quotes and maybe display them below the person card ? */}
      {/*
      ---------------------
      |                   |
      |   AVATAR & STUFF  |
      |                   |
      ---------------------
      ---------------------
      |                   |
      |   QUOTES (XXX)    |
      |                   |
      ---------------------
       */}
      <div>
        <b>Quotes ({quotes.length})</b>
      </div>
    </div>
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
