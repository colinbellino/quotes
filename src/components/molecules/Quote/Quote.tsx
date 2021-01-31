import React, { FunctionComponent, MutableRefObject, useState } from "react";

import { PersonModel, QuoteModel, ReactionModel, useAddReaction } from "data";
import { NavLink, Avatar } from "components";
import styles from "./Quote.module.css";

const locale = "fr-FR";
const dateFormat = {
  year: "numeric",
  month: "long",
  day: "numeric",
};
const dateFormatter = new Intl.DateTimeFormat(locale, dateFormat);
const reactionIds = ["❤️", "👍🏻", "😭"];

type QuoteProps = {
  quote: QuoteModel;
  person?: PersonModel;
  reactions: ReactionModel[];
  interactive?: boolean;
  showReactions?: boolean;
  reference?: MutableRefObject<null | HTMLDivElement>;
};

export const Quote: FunctionComponent<QuoteProps> = ({
  quote,
  person,
  reactions: defaultReactions,
  interactive = true,
  showReactions = true,
  reference,
}) => {
  const date = dateFormatter.format(new Date(quote.date));

  const [focused, setFocused] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reactions, setReactions] = useState(defaultReactions);
  const addReaction = useAddReaction();

  function onReactionClick(reaction: ReactionModel) {
      setLoading(true);

      addReaction(reaction)
        .then(result => {
          const reaction = (result as any).data.reaction;
          setReactions([...reactions, reaction]);
        })
        .finally(() => {
          setLoading(false); setFocused(false);
        });
  }

  return (
    <div
      ref={reference}
      className={`Quote ${styles.Quote} ${interactive && styles.Interactive}`}
      onMouseEnter={() => { setFocused(true); }}
      onMouseLeave={() => { setFocused(false); }}
    >
      <cite>
        {person ? (
          <NavLink to={`/person/${quote.author}`}>
            {person && (
              <Avatar
                url={person.avatar}
                alt={`${quote.author}'s avatar`}
                color={person.color}
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
      {showReactions && (
        <div className={styles.QuoteReactions}>
          {focused ? reactionIds.map((label, reactionId) => {
            const currentReactions = reactions.filter(reaction => reaction.reactionId == reactionId);

            return (
              <button
                key={reactionId}
                className={`QuoteReaction ${styles.QuoteReaction}`}
                disabled={loading}
                onClick={() => onReactionClick({ quoteId: quote.id, personId: 2, reactionId })}
              >
                {label}{currentReactions.length > 0 ? currentReactions.length :  ""}
              </button>
            );
          }) : reactionIds.map((label, reactionId) => {
              const currentReactions = reactions.filter(reaction => reaction.reactionId == reactionId);

              if (currentReactions.length == 0) {
                return;
              }

              return (
                <button
                  key={reactionId}
                  className={`QuoteReaction ${styles.QuoteReaction}`}
                  disabled={true}
                >
                  {label}{currentReactions.length > 0 ? currentReactions.length :  ""}
                </button>
              );
            })
          }
        </div>
      )}
    </div>
  );
};
