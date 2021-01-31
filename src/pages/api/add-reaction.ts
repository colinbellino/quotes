import { loadDoc } from "./quotes";

export default async (req: any, res: any) => {
  try {
    const sheets = await loadDoc();

    await sheets.reactions.setHeaderRow(["QuoteId", "PersonId", "ReactionId"]);
    var rowData = {
      QuoteId: req.body.quoteId,
      PersonId: req.body.personId,
      ReactionId: req.body.reactionId,
    }
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
