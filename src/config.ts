const isServer = typeof window === "undefined";
const prefix = isServer ? process.env.QUOTES_URL || "http://localhost:3000" : location.origin;

export const QUOTES_URL = `${prefix}/api/quotes`;
export const ADD_REACTION_URL = `${prefix}/api/add-reaction`;
