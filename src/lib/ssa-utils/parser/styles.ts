import { STYLE_BOOLEAN_FIELDS, STYLE_NUMBER_FIELDS, V4PlusStyle } from '../SSASubtitle';

const V4StylesParser = (lines: string[]) => {
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
        value = value === '-1';
      } else if (STYLE_NUMBER_FIELDS.includes(key)) {
        value = parseInt(value, 10);
      }

      style[key] = value;
    }

    return style as V4PlusStyle;
  });
};

export default V4StylesParser;
