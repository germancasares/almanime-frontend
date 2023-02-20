/* eslint-disable react/jsx-props-no-spreading */
// eslint-disable-next-line storybook/story-exports
import { Story } from '@storybook/react/types-6-0';

import Player, { PlayerProps } from './player';

export default {
  title: 'Alm VideoJS Editor/Player',
  component: Player,
};

const Template: Story<PlayerProps> = (args) => (
  <div>
    <Player {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  playerOptions: {
    // autoplay: true,
    // muted: true,
    controls: true,
    fluid: true,
    responsive: true,
    sources: [{
      src: '/sample.mp4',
      type: 'video/mp4',
    }],
  },
};

export const DefaultWithSubtitles = Template.bind({});
DefaultWithSubtitles.args = {
  playerOptions: {
    controls: true,
    responsive: true,
    sources: [{
      src: '/OuterScienceSubs.mp4',
      type: 'video/mp4',
    }],
  },
  subtitleOptions: {
    // subUrl: '/OuterScienceSubs.ass',
    subContent: '',
    fonts: [
      'http://fonts.cdnfonts.com/css/gisha',
      'http://fonts.cdnfonts.com/css/aharoni',
    ],
    onReady: () => {},
    debug: true,
  },
};
