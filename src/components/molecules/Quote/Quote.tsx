import React, { FunctionComponent } from "react";

import { Person, Quote as QuoteModel } from "data";
import { NavLink, Avatar } from "components";
import "./Quote.css";

const locale = "en-US";
const dateFormat = {
  year: "numeric",
  month: "long",
  day: "numeric",
};
const dateFormatter = new Intl.DateTimeFormat(locale, dateFormat);

type QuoteProps = {
  quote: QuoteModel;
  person?: Person;
};

export const Quote: FunctionComponent<QuoteProps> = ({ quote, person }) => {
  const date = dateFormatter.format(new Date(quote.date));

  return (
    <li key={quote.id} className="Quote">
      <>
        <blockquote>{quote.text}</blockquote>
        <cite>
          <NavLink to={`/person/${quote.author}`}>
            <Avatar
              color={person && person.color}
              url={person && person.avatar}
              alt={`${quote.author}'s avatar`}
            />
            {` ${quote.author} • ${date}`}
          </NavLink>
        </cite>
      </>
    </li>
  );
};
