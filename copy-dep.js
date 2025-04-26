import { copyFile, existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import { cwd } from 'process';

if (!existsSync("public/scripts")) {
  mkdirSync("public/scripts");
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
  // {
  //   origin: "node_modules/libass-wasm/dist/js/subtitles-octopus-worker.data",
  //   dest: "public/scripts/subtitles-octopus-worker.data",
  // },
];

files.forEach(({ origin, dest }) => {
  copyFile(
    join(cwd(), origin),
    join(cwd(), dest),
    (error) => {
      if (error) throw error;
      console.log(`${origin} was copied to ${dest}`);
    }
  );
});