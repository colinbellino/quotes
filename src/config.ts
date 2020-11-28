const isServer = typeof window === "undefined";
const prefix = isServer ? process.env.URL || "http://localhost:3000" : location.origin;

export const QUOTES_URL = `${prefix}/api/quotes`;
