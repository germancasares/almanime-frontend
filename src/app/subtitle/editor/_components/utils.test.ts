import { CompiledASS, ScriptInfo } from 'ass-compiler';

import { getHexColor, getRegionsFromSubtitle, textToSlice } from './utils';

describe('[textToSlice]', () => {
  it('should return a slice if text is correct', () => {
    const text = 'Test';

    const slice = textToSlice(text);

    expect(slice).toEqual({
      style: 'Default',
      fragments: [
        {
          tag: {},
          text: 'Test',
        },
      ],
    });
  });

  it('should replace new lines', () => {
    const text = 'Test\nTest';

    const slice = textToSlice(text);

    expect(slice).toEqual({
      style: 'Default',
      fragments: [
        {
          tag: {},
          text: 'Test\\NTest',
        },
      ],
    });
  });

  it('should return empty slice if no text provided', () => {
    const text = '';

    const slice = textToSlice(text);

    expect(slice).toEqual({
      style: 'Default',
      fragments: [
        {
          tag: {},
          text: '',
        },
      ],
    });
  });
});

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

    const regions = getRegionsFromSubtitle(subtitle);

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

    const regions = getRegionsFromSubtitle(subtitle);

    expect(regions).toEqual([{
      color: '#33221140',
      end: 0,
      id: '0',
      start: 0,
    }]);
  });
});
