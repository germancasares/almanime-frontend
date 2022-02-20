const fs = require('fs');
const path = require('path');

if (!fs.existsSync("public/scripts")){
  fs.mkdirSync("public/scripts");
}

fs.copyFile(
  path.join(__dirname, 'node_modules/libass-wasm/dist/js/subtitles-octopus-worker.js'),
  path.join(__dirname, 'public/scripts/subtitles-octopus-worker.js'),
  (err) => {
    if (err) throw err;
    console.log('subtitles-octopus-worker.js was copied to public/scripts');
  }
);

fs.copyFile(
  path.join(__dirname, 'node_modules/libass-wasm/dist/js/subtitles-octopus-worker.wasm'),
  path.join(__dirname, 'public/scripts/subtitles-octopus-worker.wasm'),
  (err) => {
    if (err) throw err;
    console.log('subtitles-octopus-worker.wasm was copied to public/scripts');
  }
);

fs.copyFile(
  path.join(__dirname, 'node_modules/libass-wasm/dist/js/subtitles-octopus-worker.data'),
  path.join(__dirname, 'public/scripts/subtitles-octopus-worker.data'),
  (err) => {
    if (err) throw err;
    console.log('subtitles-octopus-worker.data was copied to public/scripts');
  }
);