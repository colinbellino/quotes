import React, { FunctionComponent } from "react";

import { Person as PersonModel, Quote as QuoteModel } from "data";
import { NavLink, Avatar } from "components";
import styles from "./Quote.module.css";

const locale = "en-US";
const dateFormat = {
  year: "numeric",
  month: "long",
  day: "numeric",
};
const dateFormatter = new Intl.DateTimeFormat(locale, dateFormat);

type QuoteProps = {
  quote: QuoteModel;
  person?: PersonModel;
  interactive?: boolean;
};

export const Quote: FunctionComponent<QuoteProps> = ({
  quote,
  person,
  interactive = true,
}) => {
  const date = dateFormatter.format(new Date(quote.date));

  return (
    <div
      className={`Quote ${styles.Quote} ${interactive && styles.Interactive}`}
    >
      <blockquote>{quote.text}</blockquote>
      <cite>
        {person ? (
          <NavLink to={`/person/${quote.author}`}>
            <>
              {person && (
                <Avatar
                  color={person.color}
                  url={person.avatar}
                  alt={`${quote.author}'s avatar`}
                />
              )}
              {`${quote.author} • ${date}`}
            </>
          </NavLink>
        ) : (
          date
        )}
      </cite>
    </div>
  );
};
