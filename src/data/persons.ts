import fixtures from "./fixtures.json";

export type Person = {
  id: string;
  color: string;
  avatar: string;
};

export const persons: Person[] = fixtures.persons;
