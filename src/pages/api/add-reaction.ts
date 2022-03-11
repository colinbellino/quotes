import type { NextApiRequest, NextApiResponse } from "next";
import { loadDoc } from "./quotes";

export default async function addReaction(req: NextApiRequest, res: NextApiResponse) {
  if (process.env.QUOTES_ENV !== "production") {
    console.log("Loading fake reaction.");
    res.statusCode = 200;
    return res.json({ message: "ok", data: { reaction: req.body } });
  }

  try {
    const sheets = await loadDoc();

    await sheets.reactions.setHeaderRow(["QuoteId", "PersonId", "ReactionId"]);
    var rowData = {
      QuoteId: req.body.quoteId,
      PersonId: req.body.personId,
      ReactionId: req.body.reactionId,
    };
    await sheets.reactions.addRow(rowData);

    res.statusCode = 200;
    return res.json({ message: "ok", data: { reaction: req.body } });
  } catch (error) {
    console.error(error);
    res.statusCode = 500;
    return res.json({
      data: {
        error: "An error occured, check the logs.",
      },
    });
  }
}
