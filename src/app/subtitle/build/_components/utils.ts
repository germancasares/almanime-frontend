import { CompiledASS } from 'ass-compiler';
import { RegionParams } from 'wavesurfer.js/src/plugin/regions';

export const getHexColor = (subtitleColor: string) => {
  if (subtitleColor === '' || subtitleColor.length !== 10) return '';

  const hexColor = subtitleColor.slice(2, 10);

  // const alpha = (0xFF - parseInt(hexColor.slice(0, 2), 16)).toString(16);
  const blue = hexColor.slice(2, 4);
  const green = hexColor.slice(4, 6);
  const red = hexColor.slice(6, 8);

  return `#${red}${green}${blue}40`;
};

export const gatherRegions = (
  subtitle: CompiledASS | undefined,
): RegionParams[] | undefined => subtitle?.dialogues
  .map(({ start, end, style }, index) => ({
    start,
    end,
    color: getHexColor(subtitle.styles[style].style.PrimaryColour),
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
    data: {
      index,
    },
  }));
