import { Info, INFO_NUMBER_FIELDS } from '../SSASubtitle';

const scriptInfoParser = (lines: string[]) => lines.reduce(
  (info, line) => {
    const { key, value } = /^\s*(?<key>[^:]+):\s*(?<value>.*)(\r?\n)?$/.exec(line)?.groups ?? {};

    // eslint-disable-next-line no-param-reassign
    info[key.trim()] = INFO_NUMBER_FIELDS.includes(key.trim()) ? parseInt(value.trim(), 10) : value.trim();

    return info;
  },
  {} as { [key: string]: unknown; },
) as Info;

export default scriptInfoParser;
