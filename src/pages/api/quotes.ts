import { GoogleSpreadsheet, GoogleSpreadsheetRow } from "google-spreadsheet";

type Cache = {
  data: Object | null;
  time: number;
  duration: number;
}

const cache: Cache = {
  data: null,
  time: 0,
  duration: 6000 * 5,
};

export default async (_req: any, res: any) => {
  if (process.env.QUOTES_ENV === "development") {
    const fakeData = require("data");
    console.log("Loading fake data.");
    res.statusCode = 200;
    return res.json({ data: fakeData });
  }

  try {
    let data = {};

    if (cache.data == null || Date.now() > cache.time + cache.duration) {
      const sheets = await loadDoc();

      const [quotesRows = [], personsRows = [], reactionsRows = []] = await Promise.all([
        sheets.quotes.getRows(),
        sheets.persons.getRows(),
        sheets.reactions.getRows(),
      ]);

      data = {
        quotes: quotesRows.map(rowToQuote).reverse(),
        persons: personsRows.map(rowToPerson),
        reactions: reactionsRows.map(rowToReaction)
      };

      cache.data = data;
      cache.time = Date.now();
    } else {
      data = cache.data;
    }

    res.statusCode = 200;
    return res.json({ data });
  } catch (error) {
    console.error(error);
    res.statusCode = 500;
    return res.json({
      data: {
        persons: [],
        quotes: [],
        reactions: [],
        error: "An error occured, check the logs.",
      },
    });
  }
};

export async function loadDoc() {
  const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_DOCUMENT_ID!);
  await doc.useServiceAccountAuth({
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL!,
    private_key: process.env.GOOGLE_PRIVATE_KEY!.replace(/\\n/gm, "\n"),
  });

  await doc.loadInfo();
  console.log(`Loading data from: ${doc.title}.`);

  const quotesSheet = doc.sheetsById[process.env.GOOGLE_SHEET_QUOTES_ID!];
  const personsSheet = doc.sheetsById[process.env.GOOGLE_SHEET_PERSONS_ID!];
  const reactionsSheet = doc.sheetsById[process.env.GOOGLE_SHEET_REACTIONS_ID!];

  return { quotes: quotesSheet, persons: personsSheet, reactions: reactionsSheet };
}

const rowToQuote = (row: GoogleSpreadsheetRow) => ({
  id: row.rowIndex,
  text: row.Text,
  author: row.Author,
  date: new Date(row.Date).toISOString(),
});

const rowToPerson = (row: GoogleSpreadsheetRow) => ({
  id: row.Name,
  color: row.Color,
  avatar: row.Avatar,
});

const rowToReaction = (row: GoogleSpreadsheetRow) => ({
  quoteId: row.QuoteId,
  personId: row.PersonId,
  reactionId: row.ReactionId,
});
