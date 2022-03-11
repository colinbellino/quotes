const { generateSW } = require("workbox-build");

const swDest = ".next/service-worker.js";

generateSW({
  swDest,
  globDirectory: ".next",
  globPatterns: ["**/*.{html,json,js,css}"],
}).then(({ count, size }) => {
  console.log(
    `Generated ${swDest}, which will precache ${count} files, totaling ${size} bytes.`,
  );
});
