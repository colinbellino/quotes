import fixtures from "./fixtures.json";

export type PersonModel = {
  id: string;
  name: string;
  color: string;
  avatar: string;
};

export const persons: PersonModel[] = fixtures.persons;
