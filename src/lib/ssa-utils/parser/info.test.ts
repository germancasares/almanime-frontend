import scriptInfoParser from './info';

describe('scriptInfoParser', () => {
  it('works with empty string', () => {
    const lines: string[] = [];

    const info = scriptInfoParser(lines);

    expect(info).toEqual({});
  });

  it('trims the keys', () => {
    const lines = [
      '   Title   : Default Aegisub file',
    ];

    const info = scriptInfoParser(lines);

    expect(info).toEqual({ Title: 'Default Aegisub file' });
  });

  it('trims the values', () => {
    const lines = [
      'Title:   Default Aegisub file   ',
    ];

    const info = scriptInfoParser(lines);

    expect(info).toEqual({ Title: 'Default Aegisub file' });
  });

  it('works with empty string', () => {
    const lines = [
      'Title: Default Aegisub file',
      'ScriptType: v4.00',
      'WrapStyle: 2',
      'PlayResX: 640',
      'PlayResY: 480',
      'ScaledBorderAndShadow: yes',
      'Video File: OuterScienceAVI.avi',
      'Video Aspect Ratio: 0',
      'Video Zoom: 4',
      'Video Position: 6487',
      'Last Style Storage: Default',
      'Collisions: Normal',
    ];

    const info = scriptInfoParser(lines);

    expect(info).toEqual({
      Collisions: 'Normal',
      'Last Style Storage': 'Default',
      PlayResX: 640,
      PlayResY: 480,
      ScaledBorderAndShadow: 'yes',
      ScriptType: 'v4.00',
      Title: 'Default Aegisub file',
      'Video Aspect Ratio': 0,
      'Video File': 'OuterScienceAVI.avi',
      'Video Position': 6487,
      'Video Zoom': 4,
      WrapStyle: 2,
    });
  });
});
