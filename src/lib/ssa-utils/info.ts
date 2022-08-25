const INFO_NUMBER_FIELDS = ['PlayResX', 'PlayResY', 'Video Aspect Ratio', 'Video Position', 'Video Zoom', 'WrapStyle'];
export type Info = {
  Collisions: string;
  ['Last Style Storage']: string;
  PlayResX: number;
  PlayResY: number;
  ScaledBorderAndShadow: string;
  ScriptType: string;
  Title: string;
  ['Video Aspect Ratio']: number;
  ['Video File']: string;
  ['Video Position']: number;
  ['Video Zoom']: number;
  WrapStyle: number;
};

const parseScriptInfo = (lines: string[]) => lines.reduce(
  (info, line) => {
    const { key, value } = /^\s*(?<key>[^:]+):\s*(?<value>.*)(\r?\n)?$/.exec(line)?.groups ?? {};

    // eslint-disable-next-line no-param-reassign
    info[key.trim()] = INFO_NUMBER_FIELDS.includes(key.trim()) ? parseInt(value.trim(), 10) : value.trim();

    return info;
  },
  {} as { [key: string]: unknown; },
) as Info;

export default parseScriptInfo;
