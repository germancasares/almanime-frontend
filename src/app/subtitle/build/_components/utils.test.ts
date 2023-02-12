import { CompiledASS, CompiledASSStyle, ScriptInfo } from 'ass-compiler';
import { Dialogue } from 'lib/ssa-utils/SSASubtitle';

import { gatherRegions, getHexColor } from './utils';

describe('[getHexColor]', () => {
  it('should return hexColor', () => {
    const subtitleColor = '&H00112233';

    const hexColor = getHexColor(subtitleColor);

    expect(hexColor).toEqual('#33221140');
  });

  it('should return empty string if empty', () => {
    const subtitleColor = '';

    const hexColor = getHexColor(subtitleColor);

    expect(hexColor).toEqual('');
  });

  it('should return empty string less than 10 characters', () => {
    const subtitleColor = '&H0011';

    const hexColor = getHexColor(subtitleColor);

    expect(hexColor).toEqual('');
  });

  it('should return empty string more than 10 characters', () => {
    const subtitleColor = '&H0011223344';

    const hexColor = getHexColor(subtitleColor);

    expect(hexColor).toEqual('');
  });
});

describe('[gatherRegions]', () => {
  it('empty dialogues should return empty regions', () => {
    const subtitle = {
      dialogues: [],
      info: {} as ScriptInfo,
      collisions: 'Normal',
      height: 0,
      styles: {},
      width: 0,
    } as CompiledASS;

    const regions = gatherRegions(subtitle);

    expect(regions).toEqual([]);
  });

  it('some dialogues should return regions', () => {
    const subtitle = {
      dialogues: [
        {
          start: 0,
          end: 0,
          style: 'Test',
        },
      ],
      styles: {
        Test: {
          style: {
            PrimaryColour: '&H00112233',
          },
        },
      },
      width: 0,
    } as unknown as CompiledASS;

    const regions = gatherRegions(subtitle);

    expect(regions).toEqual([{
      color: '#33221140',
      data: {
        index: 0,
      },
      end: 0,
      handleStyle: {
        left: {
          backgroundColor: 'red',
          borderRight: '10px solid #ff6961',
        },
        right: {
          backgroundColor: 'red',
          borderLeft: '10px solid #ff6961',
        },
      },
      start: 0,
    }]);
  });
});
