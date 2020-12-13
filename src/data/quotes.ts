import fixtures from "./fixtures.json";

export type QuoteModel = {
  id: string;
  text: string;
  date: string;
  author: string;
};

export const quotes: QuoteModel[] = fixtures.quotes;
