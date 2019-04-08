module.exports = {
  staticFileGlobs: [
    "build/index.html",
    "build/static/css/**.css",
    "build/static/js/**.js",
  ],
  swFilePath: "./build/service-worker.js",
  stripPrefix: "build/",
  debug: process.env.NODE_ENV !== "production",
  handleFetch: true,
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/trusting-tesla-cbed12.netlify.com\/.netlify\/functions/,
      handler: "networkFirst",
    },
  ],
};
