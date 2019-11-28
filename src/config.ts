const isDev =
  window.location.hostname === "localhost" &&
  window.location.search.includes("nodev") === false;
const suffix = isDev ? "-dev" : "";

export const QUOTES_URL = "/.netlify/functions/quotes" + suffix;
