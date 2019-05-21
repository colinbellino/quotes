const suffix = window.location.hostname === "localhost" ? "-dev" : "";

export const QUOTES_URL = "/.netlify/functions/quotes" + suffix;
