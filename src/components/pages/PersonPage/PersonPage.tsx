import React, { FunctionComponent } from "react";
import { RouteComponentProps } from "@reach/router";
import useFetch from "fetch-suspense";

import { Person as PersonModel, Quote as QuoteModel } from "data";
import { Avatar, Quote } from "components";
import { QUOTES_URL } from "config";
import "./PersonPage.css";

type EnhancedPerson = PersonModel & { id: string };

type PersonPageViewProps = {
  person?: EnhancedPerson;
  quotes?: QuoteModel[];
};

export const PersonPageView = ({
  person,
  quotes = [],
}: PersonPageViewProps) => {
  if (!person) {
    return null;
  }

  return (
    <main className="PersonPage">
      <section className="PersonCard">
        <Avatar
          color={person.color}
          url={person.avatar}
          alt={`${person.id}'s avatar`}
        />
        <div className="Info">
          <h2>{person.id}</h2>
          <h3>{`${quotes.length} quote${quotes.length > 1 ? "s" : ""}`}</h3>
        </div>
        <ul>
          {quotes.map(quote => (
            <Quote key={quote.id} quote={quote} />
          ))}
        </ul>
      </section>
    </main>
  );
};

export const PersonPage: FunctionComponent<RouteComponentProps<{
  id: string;
}>> = ({ id }) => {
  const {
    data: { persons, quotes },
  } = useFetch(QUOTES_URL) as {
    data: {
      quotes: QuoteModel[];
      persons: PersonModel[];
    };
  };
  const person = persons.find(data => data.id === id);
  const filteredQuotes = quotes.filter(quote => quote.author === id);

  return PersonPageView({ person, quotes: filteredQuotes });
};
