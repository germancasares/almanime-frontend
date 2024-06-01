import { Duration } from "luxon";

import {
  Dialogue,
  DIALOGUE_DURATION_FIELD,
  DIALOGUE_NUMBER_FIELD,
  SubText,
} from "../SSASubtitle";

const durationParser = (text: string) => {
  const regex = /^(\d+)(?:(?::(\d+)(?::(?:(\d+)(?:\.(\d+))?)?)?)?)?$/;
  const result = text.match(regex);
  if (result) {
    const [hours, minutes, seconds, milliseconds] = result
      .slice(1)
      .map((s) => parseInt(s, 10));
    return Duration.fromObject({
      hours,
      minutes,
      seconds,
      milliseconds: milliseconds * 10,
    });
  }
  return Duration.invalid("unparsable");
};

const hasClosedCurlyBraces = (groups: SubText[]) =>
  groups.every(({ styleOverrides }) => {
    const isEmptyString = styleOverrides.length === 0;
    const hasClosedOpen = styleOverrides.match(/{/g)?.length === 1;
    const hasClosedEnd = styleOverrides.match(/}/g)?.length === 1;

    return isEmptyString || (hasClosedOpen && hasClosedEnd);
  });

// TODO: Build overrides list, splitting by \\ and handling nested functions
// NOTE: This method is missing the handling the nested function logic
// const buildOverrideList = (overrides: string) => {
//   const overridesList = overrides.replaceAll('{', '').replaceAll('}', '').split('\\').filter((e) => e);

//   return overridesList;
// };

const textGroupsBuilder = (text: string) => {
  const groups: SubText[] = [];
  let styleOverrides = "";
  let subText = "";

  for (let index = 0; index < text.length; index += 1) {
    const letter = text[index];
    switch (letter) {
      case "{":
        groups.push({
          subText,
          styleOverrides,
        });

        subText = "";
        styleOverrides = "{";
        break;
      case "}":
        styleOverrides += "}";
        break;
      case "\\":
        if (text[index + 1] === "{" || text[index + 1] === "}") {
          subText += `\\${text[index + 1]}`;
          index += 1;
        } else if (text[index + 1] === "n" || text[index + 1] === "N") {
          subText += `\\${text[index + 1]}`;
          index += 1;
        } else {
          styleOverrides += "\\";
        }
        break;
      default:
        if (styleOverrides.endsWith("}") || styleOverrides.length === 0) {
          subText += letter;
        } else {
          styleOverrides += letter;
        }
        break;
    }
  }

  if (subText.length > 0) {
    groups.push({
      subText,
      styleOverrides,
    });
  }

  return groups;
};

// TODO: Find a better way of parsing the text, maybe with regex?
const textParser = (text: string) => {
  const groups = textGroupsBuilder(text);
  if (!hasClosedCurlyBraces(groups)) {
    throw new Error("Unclosed style overrides tag");
  }

  // TODO: See buildOverrideList
  // return groups.map(({ line, overrides }) => ({
  //   line,
  //   overrides: buildOverrideList(overrides),
  // }));

  // For v1 just return the subText
  return groups.map((group) => group.subText).join("");
};

const dialoguesParser = (dialogues: string[], columns: string[]) =>
  dialogues.map((dialogueString) => {
    const dialogueArray = dialogueString.split(/\s*,\s*/g);

    const dialogue = {} as { [key: string]: unknown };
    for (
      let col = 0;
      col < columns.length && col < dialogueArray.length;
      col += 1
    ) {
      const key = columns[col];
      let value: string | number | Duration = dialogueArray[col].trim();

      if (DIALOGUE_DURATION_FIELD.includes(key)) {
        value = durationParser(value);
      } else if (DIALOGUE_NUMBER_FIELD.includes(key)) {
        value = parseInt(value, 10);
      } else if (key === "Text") {
        value = textParser(dialogueArray.slice(col).join(",").trim());
      }

      dialogue[key] = value;
    }

    return dialogue as Dialogue;
  });

const eventsParser = (lines: string[]) => {
  const splitLines = lines.map(
    (line) =>
      /^\s*(?<key>[^:]+):\s*(?<value>.*)(\r?\n)?$/.exec(line)?.groups ?? {},
  );

  const columns = splitLines
    .find((line) => line.key === "Format")
    ?.value.split(/\s*,\s*/g);
  if (!columns) throw new Error("The headers are missing from V4+ Styles");

  const rawDialogues = splitLines
    .filter((line) => line.key === "Dialogue")
    .map((line) => line.value);

  return dialoguesParser(rawDialogues, columns);
};

export default eventsParser;
