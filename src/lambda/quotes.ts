import { Handler, Context, Callback, APIGatewayEvent } from "aws-lambda";
import fetch from "node-fetch";
import parse from "csv-parse/lib/sync";

const quotesURL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vTX-rEV_2QPSPicSDNE_3I5siM_6rPL-UGI112IvTRfCXqcsF4cagiBbq8YxcTHC__hP-RMbZs1rWUc/pub?output=csv";
const personsURL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vTX-rEV_2QPSPicSDNE_3I5siM_6rPL-UGI112IvTRfCXqcsF4cagiBbq8YxcTHC__hP-RMbZs1rWUc/pub?output=csv&gid=1425935995";

const headers = { "Content-Type": "application/json" };

export const handler: Handler = async (
  _event: APIGatewayEvent,
  _context: Context,
  callback: Callback,
) => {
  try {
    callback(null, {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        data: {
          persons: await fetchPersons(),
          quotes: await fetchQuotes(),
        },
      }),
    });
  } catch (error) {
    console.error(error);

    callback(null, {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error }),
    });
  }
};

const fetchQuotes = async () => {
  const response = await fetch(quotesURL);

  if (!response.ok) {
    throw Error("Fuck");
  }

  const text = await response.text();
  const records = parse(text);
  const [_head, ...tail] = records;
  const quotes = tail
    .map((record: any, key: string) => ({
      id: key,
      text: record[0],
      author: record[1],
      date: new Date(record[2]).toISOString(),
    }))
    .reverse();

  return quotes;
};

const fetchPersons = async () => {
  const response = await fetch(personsURL);

  if (!response.ok) {
    throw Error("Fuck");
  }

  const text = await response.text();
  const records = parse(text);
  const [_head, ...tail] = records;
  const persons = tail.map((record: any, key: string) => ({
    id: record[0],
    color: record[1],
    avatar: record[2],
  }));

  return persons;
};
