import { CompiledASS, DialogueSlice } from "ass-compiler";
import { RegionParams } from "wavesurfer.js/dist/plugins/regions.min";

// slices are created splitting by \r
// fragments are created splitting by {someting}
// \n is replaced with \\N
export const textToSlice = (text: string) => {
  const slice: DialogueSlice = {
    style: "Default",
    fragments: [
      {
        tag: {},
        text: text.replace(/\n/g, "\\N"),
      },
    ],
  };

  return slice;
};

export const slicesToText = (slices: DialogueSlice[]) =>
  slices
    .reduce(
      (line, slice) =>
        line +
        slice.fragments.reduce(
          (lineFragment, fragment) => lineFragment + fragment.text,
          "",
        ),
      "",
    )
    .replace(/\\N/g, "\n");

export const getHexColor = (subtitleColor: string) => {
  if (subtitleColor === "" || subtitleColor.length !== 10) return "";

  const hexColor = subtitleColor.slice(2, 10);

  // const alpha = (0xFF - parseInt(hexColor.slice(0, 2), 16)).toString(16);
  const blue = hexColor.slice(2, 4);
  const green = hexColor.slice(4, 6);
  const red = hexColor.slice(6, 8);

  return `#${red}${green}${blue}40`;
};

export const getRegionsFromSubtitle = (subtitle: CompiledASS): RegionParams[] =>
  subtitle.dialogues.map(({ start, end, style }, index) => ({
    start,
    end,
    color: getHexColor(subtitle.styles[style].style.PrimaryColour),
    id: index.toString(),
  }));
