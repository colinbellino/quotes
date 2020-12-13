const { generateSW } = require("workbox-build");

const swDest = "out_publish/service-worker.js";

generateSW({
  swDest,
  globDirectory: "out_publish",
  globPatterns: ["**/*.{html,json,js,css}"],
}).then(({ count, size }) => {
  console.log(
    `Generated ${swDest}, which will precache ${count} files, totaling ${size} bytes.`,
  );
});
