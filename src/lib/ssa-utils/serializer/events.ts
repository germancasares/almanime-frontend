import { Duration } from 'luxon';

import { Dialogue, DIALOGUE_DURATION_FIELD, DIALOGUE_NUMBER_FIELD } from '../SSASubtitle';

const HEADER_ORDER = [
  'Layer', 'Start', 'End', 'Style', 'Name', 'MarginL', 'MarginR', 'MarginV', 'Effect', 'Text',
];

const dialogueSerializer = (
  dialogue: { [key: string]: string | number | boolean | Duration | undefined },
  paddings: { [header: string]: number },
) => {
  let styleLine = HEADER_ORDER.reduce((str, header) => {
    let value: string = dialogue[header]?.toString() ?? '';

    if (DIALOGUE_DURATION_FIELD.includes(header)) {
      value = ((dialogue[header] as unknown) as Duration).toFormat('h:mm:ss.SS');
    } else if (DIALOGUE_NUMBER_FIELD.includes(header) && header !== 'Layer') {
      value = value.padStart(4, '0');
    }

    return `${str}${value.padEnd(paddings[header], ' ')},`;
  }, '');

  styleLine = `${styleLine.slice(0, -1)}\n`;

  return `Dialogue: ${styleLine}`;
};

export const eventsSerializer = (dialogues: Dialogue[]) => {
  const paddings: { [key: string]: number } = {
    Layer: -1,
    Start: 10,
    End: 10,
    Style: -1,
    Name: -1,
    MarginL: 7,
    MarginR: 7,
    MarginV: 7,
    Effect: -1,
    Text: 0,
  };

  HEADER_ORDER.forEach((header) => {
    if (paddings[header] !== -1) return;

    paddings[header] = Math.max(header.length, ...dialogues.map(
      (
        dialogue: {
          [key: string]: string | number | boolean | Duration | undefined
        },
      ) => dialogue[header]?.toString().length ?? 0,
    ));
  });

  let eventsSection = `
[Events]
Format:   `;

  eventsSection += HEADER_ORDER.reduce(
    (format, header) => `${format}${header.padEnd(paddings[header], ' ')},`,
    '',
  );
  eventsSection = `${eventsSection.slice(0, -1)}\n`;

  eventsSection += dialogues.map((dialogue) => dialogueSerializer(dialogue, paddings)).join('');

  return eventsSection;
};

export const eventsSerializerUnprettified = (dialogues: Dialogue[]) => {
  let eventsString = `
[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
`;

  eventsString += dialogues.map(({
    Layer, Start, End, Style, Name,
    MarginL, MarginR,
    MarginV, Effect, Text,
  }) => `Dialogue: ${Layer}, ${Start.toFormat('h:mm:ss:SS')}, ${End.toFormat('h:mm:ss:SS')}, ${Style}, ${Name}, \
${MarginL.toString().padStart(4, '0')}, ${MarginR.toString().padStart(4, '0')}, \
${MarginV.toString().padStart(4, '0')}, ${Effect},${Text}
`).join('');

  return eventsString;
};
