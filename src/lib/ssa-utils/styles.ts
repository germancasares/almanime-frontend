const STYLE_BOOLEAN_FIELDS = ['Bold', 'Italic', 'Underline', 'StrikeOut'];
const STYLE_NUMBER_FIELDS = [
  'Fontsize', 'ScaleX', 'ScaleY', 'Spacing', 'Angle', 'BorderStyle', 'Outline', 'Shadow', 'Alignment',
  'MarginL', 'MarginR', 'MarginV', 'Encoding',
];
export type V4PlusStyle = {
  Name: string;
  Fontname: string;
  Fontsize: number;
  PrimaryColour: string;
  SecondaryColour: string;
  OutlineColour: string;
  BackColour: string;
  Bold: boolean;
  Italic: boolean;
  Underline: boolean;
  StrikeOut: boolean;
  ScaleX: number;
  ScaleY: number;
  Spacing: number;
  Angle: number;
  BorderStyle: number;
  Outline: number;
  Shadow: number;
  Alignment: number;
  MarginL: number;
  MarginR: number;
  MarginV: number;
  Encoding: number;
};

const parseV4Styles = (lines: string[]) => {
  const splitLines = lines.map((line) => /^\s*(?<key>[^:]+):\s*(?<value>.*)(\r?\n)?$/.exec(line)?.groups ?? {});

  const columns = splitLines.find((line) => line.key === 'Format')?.value.split(/\s*,\s*/g);
  if (!columns) throw new Error('The headers are missing from V4+ Styles');

  const styles = splitLines.filter((line) => line.key !== 'Format').map((line) => line.value);

  return styles.map((styleString) => {
    const styleArray = styleString.split(/\s*,\s*/g);

    const style = {} as { [key: string]: unknown; };
    for (let col = 0; col < columns.length && col < styleArray.length; col += 1) {
      const key = columns[col];
      let value: string | number | boolean = styleArray[col].trim();

      if (STYLE_BOOLEAN_FIELDS.includes(key)) {
        value = !!value;
      } else if (STYLE_NUMBER_FIELDS.includes(key)) {
        value = parseInt(value, 10);
      }

      style[key] = value;
    }

    return style as V4PlusStyle;
  });
};

export default parseV4Styles;
