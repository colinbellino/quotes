import faunadb from "faunadb";
import { GoogleSpreadsheet, GoogleSpreadsheetRow } from "google-spreadsheet";

export default async (_req: any, res: any) => {
  try {
    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_DOCUMENT_ID!);
    doc.useApiKey(process.env.GOOGLE_API_KEY!);

    const query = faunadb.query;
    const client = new faunadb.Client({
      secret: process.env.FAUNADB_SERVER_SECRET!,
    });

    await doc.loadInfo();
    console.log(`Importing data from: ${doc.title}.`);

    const quotesSheet = doc.sheetsById[process.env.GOOGLE_SHEET_QUOTES_ID!];
    const personsSheet = doc.sheetsById[process.env.GOOGLE_SHEET_PERSONS_ID!];
    const [quotesRows = [], personsRows = []] = await Promise.all([
      quotesSheet.getRows(),
      personsSheet.getRows(),
    ]);

    quotesRows.map(rowToQuote).forEach(async (data) => {
      await client.query(
        query.Create(query.Ref(`classes/Quote/${data.id}`), { data }),
      );
    });

    personsRows.map(rowToPerson).forEach(async (data) => {
      await client.query(
        query.Create(query.Ref(`classes/Person/${data.id}`), { data }),
      );
    });

    res.statusCode = 200;
    return res.json({
      data: `${quotesRows.length} quotes and ${personsRows.length} persons imported.`,
    });
  } catch (error) {
    console.log(error);

    res.statusCode = 500;
    return res.json({
      data: { error },
    });
  }
};

const rowToQuote = (row: GoogleSpreadsheetRow) => ({
  id: row.rowIndex,
  text: row.Text,
  author: row.Author,
  date: new Date(row.Date).toISOString(),
});

const rowToPerson = (row: GoogleSpreadsheetRow) => ({
  id: row.rowIndex,
  name: row.Name,
  color: row.Color,
  avatar: row.Avatar,
});
