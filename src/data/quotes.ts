import fixtures from "./fixtures.json";

export type Quote = {
  id: string;
  text: string;
  date: string;
  author: string;
};

export const quotes: Quote[] = fixtures.quotes;
