const { GoogleSpreadsheet, GoogleSpreadsheetRow } = require("google-spreadsheet");

const envVariables = [
  "GOOGLE_SERVICE_ACCOUNT_EMAIL",
  "GOOGLE_PRIVATE_KEY",
  "GOOGLE_SHEET_DOCUMENT_ID",
  "GOOGLE_SHEET_QUOTES_ID",
  "GOOGLE_SHEET_PERSONS_ID",
  "GOOGLE_SHEET_REACTIONS_ID",
];

const cache = {
  data: null,
  time: 0,
  duration: 6000 * 5,
};

const rowToQuote = (row) => ({
  id: row.rowIndex,
  text: row.Text,
  author: row.Author,
  date: new Date(row.Date).toISOString(),
});

const rowToPerson = (row) => ({
  id: row.Name,
  color: row.Color,
  avatar: row.Avatar,
});

const rowToReaction = (row) => ({
  quoteId: row.QuoteId,
  personId: row.PersonId,
  reactionId: row.ReactionId,
});

const getDataFixtures = async () => {
  console.log("Loading quotes (fixtures).");
  const fakeData = require("./fixtures");
  return [null, fakeData];
}

const getData = async () => {
  let data = {};

  for (let i = 0; i < envVariables.length; i++) {
    const variable = envVariables[i];

    if (process.env[variable] == undefined || process.env[variable] == "") {
      console.error(`Missing env variable: ${variable}`);
      return [{ message: `Missing env variable: ${variable}` }, data];
    }
  }

  try {
    if (cache.data == null || Date.now() > cache.time + cache.duration) {
      const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_DOCUMENT_ID);
      await doc.useServiceAccountAuth({
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/gm, "\n"),
      });

      await doc.loadInfo();
      console.log(`Loading data from: ${doc.title}.`);

      const quotesSheet = doc.sheetsById[process.env.GOOGLE_SHEET_QUOTES_ID];
      const personsSheet = doc.sheetsById[process.env.GOOGLE_SHEET_PERSONS_ID];
      const reactionsSheet = doc.sheetsById[process.env.GOOGLE_SHEET_REACTIONS_ID];

      const [quotesRows = [], personsRows = [], reactionsRows = []] = await Promise.all([
        quotesSheet.getRows(),
        personsSheet.getRows(),
        reactionsSheet.getRows(),
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

    return [null, data]
  } catch (error) {
    console.error(error);
    return [error, data];
  }
}

module.exports = { getData, getDataFixtures };
