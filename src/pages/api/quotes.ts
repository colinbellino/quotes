import faunadb from "faunadb";

import fixtures from "data/fixtures.json";
import { QuoteModel } from "data";

export default async (_req: any, res: any) => {
  if (process.env.QUOTES_ENV === "development") {
    console.log("Loading fake data.");
    res.statusCode = 200;
    return res.json({ data: fixtures });
  }

  try {
    const query = faunadb.query;
    const client = new faunadb.Client({
      secret: process.env.FAUNADB_SERVER_SECRET!,
    });

    let quotes: QuoteModel[] = [];
    let persons: QuoteModel[] = [];

    await Promise.all([
      client
        .paginate(query.Match(query.Index("allQuotes")), { size: 2000 })
        .map((ref) => query.Get(ref))
        .eachReverse((page: any) => {
          quotes = quotes.concat(page.map((row: any) => row.data));
        }),
      client
        .paginate(query.Match(query.Index("allPersons")))
        .map((ref) => query.Get(ref))
        .each((page: any) => {
          persons = persons.concat(page.map((row: any) => row.data));
        }),
    ]);

    res.statusCode = 200;
    return res.json({ data: { persons, quotes } });
  } catch (error) {
    res.statusCode = 500;
    return res.json({
      data: { persons: [], quotes: [], error },
    });
  }
};
