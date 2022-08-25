import { Duration } from 'luxon';

const DIALOGUE_DURATION_FIELD = ['Start', 'End'];
const DIALOGUE_NUMBER_FIELD = ['Layer', 'MarginL', 'MarginR', 'MarginV'];

type Dialogue = {
  Layer: number;
  Start: Duration;
  End: Duration;
  Style: string;
  Name: string;
  MarginL: number;
  MarginR: number;
  MarginV: number;
  Effect: string | undefined;
  Text: string;
};

export type Events = {
  Dialogues: Dialogue[];
};

const parseToDuration = (text: string) => {
  const regex = /^(\d+)(?:(?::(\d+)(?::(?:(\d+)(?:\.(\d+))?)?)?)?)?$/;
  const result = text.match(regex);
  if (result) {
    const [hours, minutes, seconds, milliseconds] = result.slice(1).map((s) => parseInt(s, 10));
    return Duration.fromObject({
      hours,
      minutes,
      seconds,
      milliseconds,
    });
  }
  return Duration.invalid('unparsable');
};

const parseDialogues = (dialogues:string[], columns: string[]) => dialogues.map((dialogueString) => {
  const dialogueArray = dialogueString.split(/\s*,\s*/g);

  const dialogue = {} as { [key: string]: unknown; };
  for (let col = 0; col < columns.length && col < dialogueArray.length; col += 1) {
    const key = columns[col];
    let value: string | number | Duration = dialogueArray[col].trim();

    if (DIALOGUE_DURATION_FIELD.includes(key)) {
      value = parseToDuration(value);
    } else if (DIALOGUE_NUMBER_FIELD.includes(key)) {
      value = parseInt(value, 10);
    } else if (key === 'Text') {
      value = dialogueArray.slice(col).join(',');
    }

    dialogue[key] = value;
  }

  return dialogue as Dialogue;
});

const parseEvents = (lines: string[]) => {
  const splitLines = lines.map((line) => /^\s*(?<key>[^:]+):\s*(?<value>.*)(\r?\n)?$/.exec(line)?.groups ?? {});

  const columns = splitLines.find((line) => line.key === 'Format')?.value.split(/\s*,\s*/g);
  if (!columns) throw new Error('The headers are missing from V4+ Styles');

  const rawDialogues = splitLines.filter((line) => line.key === 'Dialogue').map((line) => line.value);

  return {
    Dialogues: parseDialogues(rawDialogues, columns),
  } as Events;
};

export default parseEvents;
