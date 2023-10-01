import type { Meta, StoryObj } from '@storybook/react';

import Player from './player';

const meta: Meta<typeof Player> = {
  title: 'Alm VideoJS Editor/Player',
  component: Player,
};

export default meta;

type Story = StoryObj<typeof Player>;

export const Default: Story = {
  args: {
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
  },
};

export const DefaultWithSubtitles: Story = {
  args: {
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
  },
};
