// https://github.com/papnkukn/subsrt/blob/478e54390b74859b3643b80ff988113557ff80d8/lib/format/ssa.js#L28
// https://www.matroska.org/technical/subtitles.html#ssaass-subtitles
// http://moodub.free.fr/video/ass-specs.doc

import parseEvents, { Events } from './events';
import parseScriptInfo, { Info } from './info';
import parseV4Styles, { V4PlusStyle } from './styles';

type SSASubtitle = {
  ['Script Info']: Info;
  ['V4+ Styles']: V4PlusStyle[];
  Events: Events;
};

const ssaParser = (
  content: string,
  { endOfLine } = { endOfLine: '\r\n' },
) => {
  const parts = content.split(/\r?\n\s*\r?\n/);

  return parts.reduce((subtitle, part) => {
    const regex = /^\s*\[([^\]]+)\]\r?\n([\s\S]*)(\r?\n)*$/gi;
    const match = regex.exec(part);

    if (match) {
      const [, tag, text] = match;
      const lines = text.split(/\r?\n/);

      switch (tag) {
        case 'Script Info':
          // eslint-disable-next-line no-param-reassign
          subtitle['Script Info'] = parseScriptInfo(lines);
          if (subtitle['Script Info'].ScriptType !== 'v4.00+') {
            throw new Error('Older versions of the SSA format are not allowed.');
          }
          break;
        case 'V4+ Styles':
          // eslint-disable-next-line no-param-reassign
          subtitle['V4+ Styles'] = parseV4Styles(lines);
          break;
        case 'Events':
          // eslint-disable-next-line no-param-reassign
          subtitle.Events = parseEvents(lines);
          break;
        default:
          break;
      }
    }

    return subtitle;
  }, {} as SSASubtitle);
};

export default ssaParser;
