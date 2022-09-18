import { STYLE_BOOLEAN_FIELDS, V4PlusStyle } from '../SSASubtitle';

const HEADER_ORDER = [
  'Name', 'Fontname', 'Fontsize', 'PrimaryColour', 'SecondaryColour', 'OutlineColour', 'BackColour', 'Bold', 'Italic',
  'Underline', 'StrikeOut', 'ScaleX', 'ScaleY', 'Spacing', 'Angle', 'BorderStyle', 'Outline', 'Shadow', 'Alignment',
  'MarginL', 'MarginR', 'MarginV', 'Encoding',
];

export const styleSerializer = (
  style: { [key: string]: string | number | boolean },
  paddings: { [header: string]: number },
) => {
  let styleLine = HEADER_ORDER.reduce((str, header) => {
    let value: string = style[header].toString();

    if (STYLE_BOOLEAN_FIELDS.includes(header)) {
      value = style[header] ? '-1' : '0';
    }

    return `${str}${value.padEnd(paddings[header], ' ')},`;
  }, '');

  styleLine = `${styleLine.slice(0, -1)}\n`;

  return `Style: ${styleLine}`;
};

export const V4PlusStylesSerializer = (styles: V4PlusStyle[]) => {
  const paddings = HEADER_ORDER.reduce((paddingObj: { [header: string]: number }, header) => {
    // eslint-disable-next-line no-param-reassign
    paddingObj[header] = Math.max(header.length, ...styles.map(
      (style: { [key: string]: string | number | boolean }) => style[header].toString().length,
    ));

    return paddingObj;
  }, {});

  let styleSection = `
[V4+ Styles]
Format:`;

  styleSection += HEADER_ORDER.reduce(
    (format, header) => `${format}${header.padEnd(paddings[header], ' ')},`,
    '',
  );
  styleSection = `${styleSection.slice(0, -1)}\n`;

  styleSection += styles.map((style) => styleSerializer(style, paddings)).join('');

  return styleSection;
};

export const V4StylesSerializerUnpreattified = (styles: V4PlusStyle[]) => {
  let stylesString = `
[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, \
Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, \
Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
`;

  const maxName = Math.max(5, ...styles.map((style) => style.Name.length));

  stylesString += styles.map(({
    Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour,
    BackColour, Bold, Italic, Underline, StrikeOut, ScaleX,
    ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR,
    MarginV, Encoding,
  }) => `Style:  ${Name.padEnd(maxName, ' ')}, ${Fontname}, ${Fontsize}, ${PrimaryColour}, ${SecondaryColour}, \
  ${OutlineColour}, \
  ${BackColour}, ${Bold ? -1 : 0}, ${Italic ? -1 : 0}, ${Underline ? -1 : 0}, ${StrikeOut ? -1 : 0}, ${ScaleX}, \
  ${ScaleY}, ${Spacing}, ${Angle}, ${BorderStyle}, ${Outline}, ${Shadow}, ${Alignment}, ${MarginL}, ${MarginR}, \
  ${MarginV}, ${Encoding}
`)
    .join('');

  return stylesString;
};
