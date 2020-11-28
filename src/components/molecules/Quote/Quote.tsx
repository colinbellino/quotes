import React, { FunctionComponent, MutableRefObject } from "react";

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
  reference: MutableRefObject<null | HTMLDivElement>;
};

export const Quote: FunctionComponent<QuoteProps> = ({
  quote,
  person,
  interactive = true,
  reference,
}) => {
  const date = dateFormatter.format(new Date(quote.date));

  return (
    <div
      ref={reference}
      className={`Quote ${styles.Quote} ${interactive && styles.Interactive}`}
    >
      <cite>
        {person ? (
          <NavLink to={`/person/${quote.author}`}>
            {person && (
              <Avatar
                color={person.color}
                url={person.avatar}
                alt={`${quote.author}'s avatar`}
              />
            )}
            <div>
              <b style={{ color: person.color }}>{quote.author}</b>
              <i>&nbsp;{date}</i>
            </div>
          </NavLink>
        ) : (
          <i>{date}</i>
        )}
      </cite>
      <blockquote>{quote.text}</blockquote>
    </div>
  );
};
