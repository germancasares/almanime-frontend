const fs = require('fs');
const path = require('path');

if (!fs.existsSync("public/scripts")){
  fs.mkdirSync("public/scripts");
}

const files = [
  {
    origin: "node_modules/libass-wasm/dist/js/subtitles-octopus-worker.js",
    dest: "public/scripts/subtitles-octopus-worker.js",
  },
  {
    origin: "node_modules/libass-wasm/dist/js/subtitles-octopus-worker.wasm",
    dest: "public/scripts/subtitles-octopus-worker.wasm",
  },
  {
    origin: "node_modules/libass-wasm/dist/js/subtitles-octopus-worker.data",
    dest: "public/scripts/subtitles-octopus-worker.data",
  },
];

files.forEach(({ origin, dest }) => {
  fs.copyFile(
    path.join(__dirname, origin),
    path.join(__dirname, dest),
    (err) => {
      if (err) throw err;
      console.log(`${origin} was copied to ${dest}`);
    }
  );
});